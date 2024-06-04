package utils

// import (
// 	"os"
// )

type Config struct {
	LiveKitAPIURL    string
	LiveKitAPIKey    string
	LiveKitAPISecret string
}

func LoadConfig() *Config {
	return &Config{
		LiveKitAPIURL:    "http://127.0.0.1:7880",
		LiveKitAPIKey:    "devkey", //os.Getenv("devkey")
		LiveKitAPISecret: "secret", //os.Getenv("secret")
	}
}
