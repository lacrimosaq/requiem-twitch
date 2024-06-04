package main

import (
	"fmt"
	"log"
	"net/http"
	myhandlers "requiem-livekit-service/handlers"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// http.HandleFunc("/create-ingress", handlers.CreateIngress)
	// http.HandleFunc("/reset-ingresses", handlers.ResetIngresses) //delete TODO

	r := mux.NewRouter()
	r.HandleFunc("/create-ingress/{hostIdentity}", myhandlers.CreateIngressHandler).Methods("POST")
	r.HandleFunc("/test", myhandlers.TestHandler).Methods("GET")

	corsMiddleware := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	http.Handle("/", corsMiddleware(r))
	fmt.Println("Server started at :9000")
	log.Println("Server started at :9000")
	log.Fatal(http.ListenAndServe(":9000", nil))
}
