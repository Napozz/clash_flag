package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Country struct {
    ID           string `json:"id"`
    Enabled      bool   `json:"enabled"`
    Code3L       string `json:"code3l"`
    Code2L       string `json:"code2l"`
    Name         string `json:"name"`
    NameOfficial string `json:"name_official"`
    Capital      string `json:"capital"`
    Difficulty   string `json:"difficulty"`
}

var countries = []Country{
    {ID: "1", Enabled: true, Code3L: "AFG", Code2L: "AF", Name: "Afghanistan", NameOfficial: "Islamic Republic of Afghanistan", Capital: "Kabul", Difficulty: "2"},
    // Add more countries as needed
}

func getCountries(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(countries)
}

func main() {
    http.HandleFunc("/countries", getCountries)
    log.Println("Server started at :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}