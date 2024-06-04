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
				if err != nil {
					return nil, fmt.Errorf("error deleting ingress %s: %v", ingress.IngressId, err)
				}
			}
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
	ingressId, _ := strconv.Atoi(ingressInfo.IngressId)

	streamByUser.IngressID = sql.NullInt32{Int32: int32(ingressId), Valid: true}
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

func ToNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{String: "", Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}