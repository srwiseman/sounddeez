package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"io/ioutil"
)

type Artist struct {
	Id int
	Name string
}

type Album struct {
	Id int
	Title string
	cover string
}

type Song struct {
	Id int
	Title string
	Artist Artist
	Album Album

}
func getSongDeezer(trackID string) Song{
	var myJson string
	response, err := http.Get("https://api.deezer.com/track/" + trackID)
	if err != nil {
		fmt.Printf("%s", err)
        	os.Exit(1)
	} else {
        	defer response.Body.Close()
        	contents, err := ioutil.ReadAll(response.Body)
        	if err != nil {
            		fmt.Printf("%s", err)
            		os.Exit(1)
		}
		json := string(contents)
		myJson = json
	}
	fmt.Println(myJson)
	var myJsonByte = []byte(myJson)
	var mySong Song
	err = json.Unmarshal(myJsonByte, &mySong)
	if err != nil {
		fmt.Println("error:", err)
	}
	fmt.Println(mySong.Id, mySong.Title, mySong.Artist.Name, mySong.Album.Title)
	return mySong
}

func main(){

	getSongDeezer("3135556")
}
