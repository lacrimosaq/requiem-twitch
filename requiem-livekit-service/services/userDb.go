package services

import (
	"database/sql"
	"fmt"
	models "requiem-livekit-service/models"

	_ "github.com/go-sql-driver/mysql"
)

func UserFindById(db *sql.DB, id int) (*models.User, error) {
	query := "SELECT id, username, avatar, email, info, password, role, created_at, updated_at FROM users WHERE id = ?"
	row := db.QueryRow(query, id)
	fmt.Println(row)

	var user models.User
	err := row.Scan(&user.ID, &user.Username, &user.Avatar, &user.Email, &user.Info, &user.Password, &user.Role, &user.CreatedAt, &user.UpdatedAt)
	fmt.Println(user.ID)
	fmt.Println(user.Username)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, nil
		}
		fmt.Printf("Error scanning row: %v\n", err)
		return nil, err
	}
	return &user, nil
}
