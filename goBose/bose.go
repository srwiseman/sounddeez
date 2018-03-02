package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	xj "github.com/basgys/goxml2json"
)

//NowPlayingJSON - Global variable to store what's currently playing.
var NowPlayingJSON string

//SpeakerIP - Change this to the IP of you Bose soundtouch speaker.
const SpeakerIP = "http://192.168.0.14:8090/"

//Artist - This stores information related to a song's artist
type Artist struct {
	ID   int
	Name string
}

//Album - This stores information related to the song's album
type Album struct {
	ID    int
	Title string
	Cover string
}

//Song - This stores information related to the song. Including an Album object and a Artist object.
type Song struct {
	ID     int
	Title  string
	Artist Artist
	Album  Album
}

var songQueue []Song

// This function plays a song when given a songID string
func playSong(songID string) {
	postBose("select", "<ContentItem source='DEEZER' type='track' location="+songID+" sourceAccount='swiseman@gmail.com' isPresetable='true'></ContentItem>")
}

// This function takes in a string ID of a song, and places it in the queue
func queueSong(songID string) {
	fmt.Println("Adding song to queue: " + songID)
	var songToAdd = getSongDeezer(songID)
	songQueue = append(songQueue, songToAdd)
	fmt.Println(songQueue)
}

// When called, this function plays the next song in the queue
func playNextSongInQueue() {
	if len(songQueue) > 0 {
		playSong(strconv.Itoa(songQueue[0].ID))
		songQueue = songQueue[1:]
	}
	fmt.Println("No songs left in the queue!")
}

//This function takes in a Deezer song id and returns info about the song
func getSongDeezer(trackID string) Song {
	var myJSON string
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
		myJSON = json
	}
	//fmt.Println(myJSON)
	var myJSONByte = []byte(myJSON)
	var mySong Song
	err = json.Unmarshal(myJSONByte, &mySong)
	if err != nil {
		fmt.Println("error:", err)
	}
	//fmt.Println(mySong.ID, mySong.Title, mySong.Artist.Name, mySong.Album.Title)
	return mySong
}

//This sends a post resquest to the Bose Soundtouch radio.
func postBose(inPath string, inXML string) {
	xmlData := inXML
	readData := strings.NewReader(xmlData)
	req, err := http.NewRequest("POST", SpeakerIP+inPath, readData)
	if err != nil {
		fmt.Printf("http.NewRequest() error: %v\n", err)
		return
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	c := &http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		fmt.Printf("http.Do() error: %v\n", err)
		return
	}
	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll() error: %v\n", err)
		return
	}
	//Just print the response to the server console.
	fmt.Printf("read resp.Body successfully:\n%v\n", string(data))
}

//This sends a get request to the Bose Soundtouch radio. Converts the response to JSON.
func getBose(endURL string) string {
	var myJSON string
	//send the get request
	response, err := http.Get(SpeakerIP + endURL)
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
		xml := strings.NewReader(string(contents))
		//fmt.Printf("%s\n", string(contents))
		json, err := xj.Convert(xml)
		if err != nil {
			// Oops...
		}
		//fmt.Println(json)
		myJSON = json.String()
	}
	return myJSON
}

// Returns the current queue in JSON format
func getQueueJSON() string {
	var queue = songQueue
	fmt.Println(queue)
	b, err := json.Marshal(queue)
	if err != nil {
		fmt.Println("error:", err)
	}
	return string(b)
}

///main http handler. This detarmines what the web server will show
func handler(w http.ResponseWriter, r *http.Request) {
	//split the incoming url on /
	myURL := strings.Split(r.URL.Path, "/")
	fmt.Println(myURL)

	//TODO change this to a switch
	//skip track
	if myURL[1] == "next_track" {
		postBose("key", "<key state='press' sender='Gabbo'>NEXT_TRACK</key>")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "SKIPPING TRACK")

		//Toggle the power
	} else if r.URL.Path[1:] == "power" {
		postBose("key", "<key state='press' sender='Gabbo'>POWER</key>")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "Pressing POWER")

		//search Deezer for string
	} else if myURL[1] == "search" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, searchDeezer(myURL[2]))

		//Just return what's currently playing
	} else if myURL[1] == "play" {
		playSong(myURL[2])
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "playing "+myURL[2])
	} else if myURL[1] == "volume" {
		postBose("volume", "<volume>"+myURL[2]+"</volume>")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "Changing volume to "+myURL[2])

	} else if myURL[1] == "add" {
		queueSong(myURL[2])
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, "Changing volume to "+myURL[2])
	} else if myURL[1] == "queue" {
		var queueJSON = getQueueJSON()
		fmt.Println(queueJSON)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, queueJSON)
	} else {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, getBose("nowPlaying"))
	}
}

//This function searches deezer for a string, then returns the search results as JSON
func searchDeezer(artist string) string {
	var myJSON string
	response, err := http.Get("https://api.deezer.com/search?q=" + artist)
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
		myJSON = json
	}
	return myJSON
}

//Poll for what's playing ever 10 seconds.
func nowPlayingPoller() {
	for {
		time.Sleep(10000 * time.Millisecond)
		fmt.Println("POLLING")
		var nowPlaying = getBose("nowPlaying")
		//fmt.Println(nowPlaying)
		if strings.Contains(nowPlaying, "INVALID_SOURCE") {
			//TODO play a song
			fmt.Println("Play a new song!")
			playNextSongInQueue()
		}
		if strings.Contains(nowPlaying, "STANDBY") {
			//TODO play a song
			fmt.Println("Play a new song!")
			playNextSongInQueue()
		}
		fmt.Println("Current song queue: ")
		fmt.Println(songQueue)

	}
}

func main() {
	//fmt.Println(searchDeezer("test"))
	go nowPlayingPoller()
	NowPlayingJSON = getBose("nowPlaying")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":9000", nil)
}
