package services

import (
	"database/sql"
	models "requiem-livekit-service/models"

	_ "github.com/go-sql-driver/mysql"
)

func StreamFindById(db *sql.DB, id int) (*models.Stream, error) {
	query := "SELECT id, chat_delay, ingress_id, is_follower_chat, is_live, name, server_url, stream_key, thumbnail, user_id, created_at, updated_at FROM streams WHERE id = ?"
	row := db.QueryRow(query, id)

	var stream models.Stream
	err := row.Scan(&stream.ID, &stream.ChatDelay, &stream.IngressID, &stream.IsFollowerChat, &stream.IsLive, &stream.Name, &stream.ServerURL, &stream.StreamKey, &stream.Thumbnail, &stream.UserID, &stream.CreatedAt, &stream.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &stream, nil
}

func StreamUpdate(db *sql.DB, stream *models.Stream) error {
	query := `
        UPDATE streams
        SET chat_delay = ?, ingress_id = ?, is_follower_chat = ?, is_live = ?, name = ?, server_url = ?, stream_key = ?, thumbnail = ?, user_id = ?, updated_at = NOW()
        WHERE id = ?
    `
	_, err := db.Exec(query, stream.ChatDelay, stream.IngressID, stream.IsFollowerChat, stream.IsLive, stream.Name, stream.ServerURL, stream.StreamKey, stream.Thumbnail, stream.UserID, stream.ID)
	return err
}
func StreamFindByUserId(db *sql.DB, userId int) ([]models.Stream, error) {
	query := "SELECT id, chat_delay, ingress_id, is_follower_chat, is_live, name, server_url, stream_key, thumbnail, user_id, created_at, updated_at FROM streams WHERE user_id = ?"
	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var streams []models.Stream
	for rows.Next() {
		var stream models.Stream
		err := rows.Scan(&stream.ID, &stream.ChatDelay, &stream.IngressID, &stream.IsFollowerChat, &stream.IsLive, &stream.Name, &stream.ServerURL, &stream.StreamKey, &stream.Thumbnail, &stream.UserID, &stream.CreatedAt, &stream.UpdatedAt)
		if err != nil {
			return nil, err
		}
		streams = append(streams, stream)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return streams, nil
}
