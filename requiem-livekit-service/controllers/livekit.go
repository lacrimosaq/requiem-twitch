package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"requiem-livekit-service/models"
	services "requiem-livekit-service/services"
	utils "requiem-livekit-service/utils"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	guuid "github.com/google/uuid"
	"github.com/livekit/protocol/auth"
	livekit "github.com/livekit/protocol/livekit"
	lksdk "github.com/livekit/server-sdk-go"
)

func Test(test string) *models.User {
	fmt.Printf("test = " + test)

	// db, err := sql.Open("mysql", "root:<>@tcp(127.0.0.1:3306)/requiemDb")
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/requiemDb?parseTime=true")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	fmt.Println("Success!")

	testId, _ := strconv.Atoi(test)
	user, _ := services.UserFindById(db, testId)
	fmt.Printf("TEST DB")
	fmt.Printf("%+v\n", user)
	return user

}
func CreateIngresses(hostIdentity int, ingressType string) (*livekit.IngressInfo, error) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/requiemDb?parseTime=true")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	fmt.Println("Success!")

	user, err := services.UserFindById(db, hostIdentity)
	if err != nil {
		return nil, fmt.Errorf("error finding user by ID: %v", err)
	}
	if user == nil {
		return nil, fmt.Errorf("user with ID %d does not exist", hostIdentity)
	}
	fmt.Println("UserFindById")

	var config = utils.LoadConfig()
	fmt.Println("LoadConfig")
	fmt.Println("config.LiveKitAPIURL = " + config.LiveKitAPIURL)
	fmt.Println("config.LiveKitAPIKey = " + config.LiveKitAPIKey)
	fmt.Println("config.LiveKitAPISecret = " + config.LiveKitAPISecret)

	client := lksdk.NewIngressClient(config.LiveKitAPIURL, config.LiveKitAPIKey, config.LiveKitAPISecret)
	fmt.Println("NewIngressClient")

	// reset ingress
	roomClient := lksdk.NewRoomServiceClient(config.LiveKitAPIURL, config.LiveKitAPIKey, config.LiveKitAPISecret)
	fmt.Println("NewRoomServiceClient")

	ingresses, err := client.ListIngress(context.Background(), &livekit.ListIngressRequest{
		RoomName: fmt.Sprintf("%d", hostIdentity),
	})
	if err != nil {
		return nil, fmt.Errorf("error listing ingress: %v", err)
	}
	fmt.Println("ListIngress")

	rooms, err := roomClient.ListRooms(context.Background(), &livekit.ListRoomsRequest{
		Names: []string{fmt.Sprintf("%d", hostIdentity)},
	})
	if err != nil {
		return nil, fmt.Errorf("error listing rooms: %v", err)
	}
	fmt.Println("ListRooms")

	if rooms != nil && rooms.Rooms != nil {
		for _, room := range rooms.Rooms {
			_, err := roomClient.DeleteRoom(context.Background(), &livekit.DeleteRoomRequest{
				Room: room.Name,
			})
			fmt.Println("DeleteRoom")
			if err != nil {
				return nil, fmt.Errorf("error deleting room %s: %v", room.Name, err)
			}
		}
	}
	fmt.Println("DeleteRoom")

	if ingresses != nil && ingresses.Items != nil {
		for _, ingress := range ingresses.Items {
			if ingress.IngressId != "" {
				_, err := client.DeleteIngress(context.Background(), &livekit.DeleteIngressRequest{
					IngressId: ingress.IngressId,
				})
				fmt.Println("DeleteIngress 1.0")
				if err != nil {
					return nil, fmt.Errorf("error deleting ingress %s: %v", ingress.IngressId, err)
				}
			}
			fmt.Println("DeleteIngress 2.0")
		}
	}
	fmt.Println("DeleteIngress")

	ctx := context.Background()
	fmt.Println("context.Background()")

	// Prepare common request fields
	options := &livekit.CreateIngressRequest{
		Name:                user.Username,
		RoomName:            fmt.Sprintf("%d", user.ID),
		ParticipantName:     user.Username,
		ParticipantIdentity: fmt.Sprintf("%d", user.ID),
	}
	fmt.Println("CreateIngressRequest")

	if ingressType == "WHIP_INPUT" {
		options.EnableTranscoding = &[]bool{true}[0]
	} else {
		options.Video = &livekit.IngressVideoOptions{
			Source: livekit.TrackSource_CAMERA,
			EncodingOptions: &livekit.IngressVideoOptions_Preset{
				Preset: livekit.IngressVideoEncodingPreset_H264_1080P_30FPS_3_LAYERS,
			},
		}
		options.Audio = &livekit.IngressAudioOptions{
			Source: livekit.TrackSource_MICROPHONE,
			EncodingOptions: &livekit.IngressAudioOptions_Preset{
				Preset: livekit.IngressAudioEncodingPreset_OPUS_MONO_64KBS,
			},
		}
	}

	// Create the ingress
	ingressInfo, err := client.CreateIngress(ctx, options)
	fmt.Println("CreateIngress")
	if err != nil {
		return nil, fmt.Errorf("error creating ingress: %v", err)
	}
	fmt.Printf("Ingress created: %v\n", ingressInfo)

	streamsByUser, err := services.StreamFindByUserId(db, hostIdentity)
	if err != nil {
		return nil, fmt.Errorf("error finding streams by user ID: %v", err)
	}
	if len(streamsByUser) == 0 {
		return nil, fmt.Errorf("no streams found for user ID %d", hostIdentity)
	}

	streamByUser := streamsByUser[0]

	streamByUser.IngressID = ToNullString(ingressInfo.IngressId)
	fmt.Printf("ingressInfo.IngressId = %v\n", ingressInfo.IngressId)
	streamByUser.ServerURL = ToNullString(ingressInfo.Url)
	fmt.Printf("ingressInfo.Url = %s\n", ingressInfo.Url)
	streamByUser.StreamKey = ToNullString(ingressInfo.StreamKey)
	fmt.Printf("ingressInfo.StreamKey = %s\n", ingressInfo.StreamKey)

	err = services.StreamUpdate(db, &streamByUser)
	if err != nil {
		return nil, fmt.Errorf("error updating stream: %v", err)
	}
	return ingressInfo, nil
}

func CreateViewerToken(hostIdentity int, viewerId int) (string, error) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/requiemDb?parseTime=true")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	viewer := new(models.User)
	if viewerId > 0 {
		viewer, _ = services.UserFindById(db, viewerId)
	} else {
		viewer.ID = 0
		viewer.Username = "guest#" + guuid.New().String()
	}

	host, err := services.UserFindById(db, hostIdentity)
	if err != nil {
		return "", fmt.Errorf("error finding host by ID: %v", err)
	}
	if host == nil {
		return "", fmt.Errorf("host with ID %d does not exist", hostIdentity)
	}

	var config = utils.LoadConfig()
	token := auth.NewAccessToken(config.LiveKitAPIKey, config.LiveKitAPISecret)
	if viewerId == hostIdentity {
		token.SetIdentity("host#" + fmt.Sprint(viewer.ID))
	} else {
		token.SetIdentity(fmt.Sprint(viewer.ID))
	}
	token.SetName(viewer.Username)

	canPublish := false
	canPublishData := true
	grant := &auth.VideoGrant{
		Room:           fmt.Sprint(host.ID),
		RoomJoin:       true,
		CanPublish:     &canPublish,
		CanPublishData: &canPublishData,
	}
	token.AddGrant(grant)

	return token.ToJWT()

}
func UpdateIngressesStatus() error {
	fmt.Println("UpdateIngressesStatus!")
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/requiemDb?parseTime=true")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	streams, _ := services.StreamGetAll(db)

	var config = utils.LoadConfig()

	client := lksdk.NewIngressClient(config.LiveKitAPIURL, config.LiveKitAPIKey, config.LiveKitAPISecret)
	roomClient := lksdk.NewRoomServiceClient(config.LiveKitAPIURL, config.LiveKitAPIKey, config.LiveKitAPISecret)

	// reset ingress

	ingresses, err := client.ListIngress(context.Background(), &livekit.ListIngressRequest{})
	if err != nil {
		return fmt.Errorf("error listing ingress: %v", err)
	}

	if ingresses != nil && ingresses.Items != nil {
		for _, item := range ingresses.Items {
			for _, stream := range streams {
				if item.IngressId == stream.IngressID.String { //important
					if item.State.Status == livekit.IngressState_ENDPOINT_PUBLISHING {
						participant, _ := roomClient.ListParticipants(context.Background(), &livekit.ListParticipantsRequest{
							Room: item.RoomName,
						})
						if participant == nil {
							continue
						}
						if len(participant.Participants) != stream.ViewersCount || stream.IsLive == false {
							if stream.IsLive == false {
								stream.IsLive = true
								fmt.Println("ChangeOnTrue")
							}
							if len(participant.Participants) != stream.ViewersCount {
								stream.ViewersCount = len(participant.Participants)
								fmt.Println("ChangeCount")
							}
							services.StreamUpdate(db, &stream)
						}
					} else if item.State.Status == livekit.IngressState_ENDPOINT_INACTIVE {
						participant, _ := roomClient.ListParticipants(context.Background(), &livekit.ListParticipantsRequest{
							Room: item.RoomName,
						})
						if participant == nil {
							continue
						}
						if len(participant.Participants) != stream.ViewersCount || stream.IsLive == true {
							if stream.IsLive == true {
								stream.IsLive = false
								stream.ViewersCount = 0
								fmt.Println("ChangeOnFalse")
							} else if len(participant.Participants) != stream.ViewersCount {
								stream.ViewersCount = len(participant.Participants)
								fmt.Println("ChangeCount")
							}
							services.StreamUpdate(db, &stream)
						}

					}
				}
			}
		}
	}
	return nil
}

func ToNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{String: "", Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}
