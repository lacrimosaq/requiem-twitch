package models

import (
	"database/sql"
	"time"

	"github.com/jmoiron/sqlx/types"
)

type User struct {
	ID        int            `json:"id"`
	Username  string         `json:"username"`
	Avatar    sql.NullString `json:"avatar"`
	Email     string         `json:"email"`
	Info      sql.NullString `json:"info"`
	Password  string         `json:"password"`
	Role      string         `json:"role"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

type Stream struct {
	ID             int            `json:"id"`
	ChatDelay      sql.NullInt32  `json:"chat_delay"`
	IngressID      sql.NullString `json:"ingress_id"`
	IsFollowerChat types.BitBool  `json:"is_follower_chat"`
	IsLive         types.BitBool  `json:"is_live"`
	Name           sql.NullString `json:"name"`
	ServerURL      sql.NullString `json:"server_url"`
	StreamKey      sql.NullString `json:"stream_key"`
	Thumbnail      sql.NullString `json:"thumbnail"`
	UserID         int            `json:"user_id"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
}
