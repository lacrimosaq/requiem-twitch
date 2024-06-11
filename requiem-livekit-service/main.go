package main

import (
	"fmt"
	"log"
	"net/http"
	"requiem-livekit-service/controllers"
	myhandlers "requiem-livekit-service/handlers"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// http.HandleFunc("/create-ingress", handlers.CreateIngress)
	// http.HandleFunc("/reset-ingresses", handlers.ResetIngresses) //delete TODO

	r := mux.NewRouter()
	r.HandleFunc("/create-ingress/{hostIdentity}", myhandlers.CreateIngressHandler).Methods("POST")
	r.HandleFunc("/create-token/{hostIdentity}", myhandlers.CreateTokenHandler).Methods("POST")
	r.HandleFunc("/test", myhandlers.TestHandler).Methods("GET")

	corsMiddleware := handlers.CORS(
		// handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// http.Handle("/", corsMiddleware(r))
	// fmt.Println("Server started at :9000")
	// log.Println("Server started at :9000")
	// log.Fatal(http.ListenAndServe(":9000", nil))
	go func() {
		fmt.Println("Server started at :9000")
		log.Println("Server started at :9000")
		if err := http.ListenAndServe(":9000", corsMiddleware(r)); err != nil {
			log.Fatal(err)
		}
	}()

	// Create a ticker that triggers every 10 seconds
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	// Run the update function immediately and then every 10 seconds

	go func() {
		for range ticker.C {
			controllers.UpdateIngressesStatus()
		}
	}()

	// Keep the main function running indefinitely
	select {}
}
