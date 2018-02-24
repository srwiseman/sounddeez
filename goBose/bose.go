package main

import ("fmt"
	"net/http"
	"io/ioutil"
	"strings"
	"os"
	xj "github.com/basgys/goxml2json"
	"encoding/json"
	"time"
	"strconv"
	)






//Global variable to store what's currently playing
var NOW_PLAYING_JSON string

const SPEAKER_IP = "http://192.168.0.14:8090/"

type Artist struct {
        Id int
        Name string
}

type Album struct {
        Id int
        Title string
        Cover string
}

type Song struct {
        Id int
        Title string
        Artist Artist
        Album Album

}

var songQueue []Song


func playSong (songID string){
	postBose("select", "<ContentItem source='DEEZER' type='track' location="+songID+" sourceAccount='swiseman@gmail.com' isPresetable='true'></ContentItem>")
}

func queueSong(songID string){
	fmt.Println("Adding song to queue: " + songID)
	var songToAdd = getSongDeezer(songID)
	songQueue = append(songQueue, songToAdd)
	fmt.Println(songQueue)
}

func playNextSongInQueue(){
	if (len(songQueue) > 0){
		playSong(strconv.Itoa(songQueue[0].Id))
		songQueue = songQueue[1:]
	}
	fmt.Println("No songs left in the queue!")
}


//This function takes in a Deezer song id and returns info about the song
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
        //fmt.Println(myJson)
        var myJsonByte = []byte(myJson)
        var mySong Song
        err = json.Unmarshal(myJsonByte, &mySong)
        if err != nil {
                fmt.Println("error:", err)
        }
        //fmt.Println(mySong.Id, mySong.Title, mySong.Artist.Name, mySong.Album.Title)
        return mySong
}


//This sends a post resquest to the Bose Soundtouch radio.
func postBose(inPath string, inXml string){
	xmlData := inXml
        readData := strings.NewReader(xmlData)
        req, err := http.NewRequest("POST", SPEAKER_IP+inPath, readData)
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
func getBose(endURL string) string{
	var myJson string
	//send the get request
	response, err := http.Get(SPEAKER_IP + endURL)
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
	myJson = json.String()
    }
	return myJson
}

func getQueueJson() string{
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
	myUrl := strings.Split(r.URL.Path, "/")
	fmt.Println(myUrl)

	//TODO change this to a switch
	//skip track
	if (myUrl[1] == "next_track"){
                postBose("key", "<key state='press' sender='Gabbo'>NEXT_TRACK</key>")
		w.Header().Set("Access-Control-Allow-Origin", "*")
        	fmt.Fprintf(w, "SKIPPING TRACK")

	//Toggle the power
        } else if (r.URL.Path[1:] == "power"){
		postBose("key", "<key state='press' sender='Gabbo'>POWER</key>")
                w.Header().Set("Access-Control-Allow-Origin", "*")
                fmt.Fprintf(w, "Pressing POWER")

	//search Deezer for string
	} else if (myUrl[1] == "search"){
		w.Header().Set("Access-Control-Allow-Origin", "*")
        	fmt.Fprintf(w, searchDeezer(myUrl[2]))

	//Just return what's currently playing
	} else if (myUrl[1] == "play"){
		playSong(myUrl[2])
                w.Header().Set("Access-Control-Allow-Origin", "*")
                fmt.Fprintf(w, "playing " + myUrl[2])
	}else if (myUrl[1] == "volume"){
		postBose("volume", "<volume>"+myUrl[2]+"</volume>")
        	w.Header().Set("Access-Control-Allow-Origin", "*")
       		fmt.Fprintf(w, "Changing volume to " + myUrl[2]) 

	}else if (myUrl[1] == "add"){
                queueSong(myUrl[2])
                w.Header().Set("Access-Control-Allow-Origin", "*")
                fmt.Fprintf(w, "Changing volume to " + myUrl[2])
        }else if (myUrl[1] == "queue"){
                var queueJson = getQueueJson()
                fmt.Println(queueJson)
                w.Header().Set("Access-Control-Allow-Origin", "*")
                fmt.Fprintf(w, queueJson)
        }else {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, getBose("now_playing"))
	}
}

//This function searches deezer for a string, then returns the search results as JSON
func searchDeezer(artist string) string{
	 var myJson string
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
        myJson = json
    }
        return myJson
}

//Poll for what's playing ever 10 seconds.
func nowPlayingPoller() {
	for {
		time.Sleep(10000 * time.Millisecond)
		fmt.Println("POLLING")
		var now_playing = getBose("now_playing")
		//fmt.Println(now_playing)
		if strings.Contains(now_playing, "INVALID_SOURCE"){
			//TODO play a song
			fmt.Println("Play a new song!")
			playNextSongInQueue()
		}
		if strings.Contains(now_playing, "STANDBY"){
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
	NOW_PLAYING_JSON = getBose("now_playing")
	http.HandleFunc("/", handler)
   	http.ListenAndServe(":9000", nil)
}
