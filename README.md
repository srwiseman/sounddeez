INTRODUCTION
=====
This project provides a different front-end to WiFi connected Bose Soundtouch sound systems. This came about by a few problems I had with the official Bose app:

a) anyone who visited your house and wanted to play music had to download the app.

b) There was no way to "queue up" a song so that it played after other songs were played.

This project basically turns your device into a virtual jukebox. Anyone on your WiFi can queue up or play any song available on Deezer.

SCREENSHOTS
=====
![screenshot](screenshots/search.png "Search")
![screenshot](screenshots/queue.png "Queue")
![screenshot](screenshots/sidebar.png "Sidebar")

INSTRUCTIONS
=====
The project consists of two different servers. A back-end server written in Go and a front end server written in node/React. The backend server handles all communication to the sound system and serves JSON to the front end server. The front end server pulls the JSON data from the backend server and displays it in a GUI using a React framework.

