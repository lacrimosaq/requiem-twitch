package main

import (
	"fmt"
	"log"
	"net/http"
	"requiem-livekit-service/handlers"

	"github.com/gorilla/mux"
)

func main() {
	// http.HandleFunc("/create-ingress", handlers.CreateIngress)
	// http.HandleFunc("/reset-ingresses", handlers.ResetIngresses) //delete TODO

	r := mux.NewRouter()
	r.HandleFunc("/create-ingress/{hostIdentity}", handlers.CreateIngressHandler).Methods("POST")
	r.HandleFunc("/test", handlers.TestHandler).Methods("GET")
	http.Handle("/", r)
	fmt.Println("Server started at :9000")
	log.Println("Server started at :9000")
	log.Fatal(http.ListenAndServe(":9000", nil))
}
