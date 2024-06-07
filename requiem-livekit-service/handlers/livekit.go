package handlers

import (
	"encoding/json"
	"net/http"
	"requiem-livekit-service/controllers"
	"strconv"

	"github.com/gorilla/mux"
)

func CreateIngressHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	hostIdentityStr, ok := vars["hostIdentity"]
	// hostIdentityStr := r.URL.Query().Get("hostIdentity")
	if !ok {
		http.Error(w, "Missing hostIdentity in URL path", http.StatusBadRequest)
		return
	}
	ingressType := r.URL.Query().Get("ingressType")

	if hostIdentityStr == "" || ingressType == "" {
		http.Error(w, "Missing required query parameters", http.StatusBadRequest)
		return
	}

	hostIdentity, err := strconv.Atoi(hostIdentityStr)
	if err != nil {
		http.Error(w, "Invalid hostIdentity parameter", http.StatusBadRequest)
		return
	}

	ingressInfo, err := controllers.CreateIngresses(hostIdentity, ingressType)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ingressInfo)
}

func CreateTokenHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	hostIdentityStr, ok := vars["hostIdentity"]
	// hostIdentityStr := r.URL.Query().Get("hostIdentity")
	if !ok {
		http.Error(w, "Missing hostIdentity in URL path", http.StatusBadRequest)
		return
	}
	viewerIdStr := r.URL.Query().Get("viewerId")

	if hostIdentityStr == "" || viewerIdStr == "" {
		http.Error(w, "Missing required query parameters", http.StatusBadRequest)
		return
	}

	hostIdentity, err := strconv.Atoi(hostIdentityStr)
	viewerId, err := strconv.Atoi(viewerIdStr)
	if err != nil {
		http.Error(w, "Invalid hostIdentity parameter", http.StatusBadRequest)
		return
	}

	ingressInfo, err := controllers.CreateViewerToken(hostIdentity, viewerId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ingressInfo)
}

func TestHandler(w http.ResponseWriter, r *http.Request) {
	test := r.URL.Query().Get("test")
	user := controllers.Test(test)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
