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
		LiveKitAPIURL:    "https://requiem-project-u5fcefmd.livekit.cloud",
		LiveKitAPIKey:    "APIG8z6bb7Lw88m",                              //os.Getenv("devkey")
		LiveKitAPISecret: "gd6l8g1UfVN22pOgKJRyW9ij2YmmbyeQRqFi4fx2EEoB", //os.Getenv("secret")
	}
}
