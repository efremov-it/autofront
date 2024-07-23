package main

import (
	"fmt"
	"net/http"
	"os"
	"github.com/rs/cors"
)

func handler(w http.ResponseWriter, r *http.Request) {
	clientIP := r.RemoteAddr
	host := r.Host
	fmt.Fprintf(w, "Client IP: %s\nHost: %s\n", clientIP, host)
}

func main() {
 mux := http.NewServeMux()
 mux.HandleFunc("/", handler)

 // Разрешить все запросы CORS
 c := cors.New(cors.Options{
  AllowedOrigins:   []string{"*"},
  AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
  AllowedHeaders:   []string{"*"},
  AllowCredentials: true,
 })

 handler := c.Handler(mux)

 port := os.Getenv("PORT")
 if port == "" {
  port = "8080"
 }
 http.ListenAndServe(":"+port, handler)
}
