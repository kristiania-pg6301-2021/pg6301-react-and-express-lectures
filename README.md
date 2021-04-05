  # Quiz game with server side logic

## Functionality

1. User logs in
2. User starts quiz
3. User sees current question
4. User responds to current question
5. When user has answered all questions, final score is displayed

## TODO

* [x] Create React application
    * `mkdir client`
    * `cd client`
    * `npm init -y`
    * `npm install -P react react-dom react-router react-router-dom`
    * `npm install -D parcel@next prettier`
    * Create start script, index.html, index.jsx and a few pages to route between
* [x] Create Express application
    * `mkdir server`
    * `cd server`
    * `npm init -y`
    * `npm install -P express`
    * `npm install -D nodemon prettier`
    * Create server.js script
* [x] Top level app which lets user run tests and start servers for both client and server
    * Add scripts for prettier, test and start
    * Run server and client with https
      * `openssl req -x509 -nodes -keyout server.key -out server.crt -subj "/CN=webapps.kristiania.no" -addext "subjectAltName = DNS:webapps.kristiania.no`
* [x] Login client side with Active Directory
    * Server returns discovery_url and client_id from GET /api/user
    * Client generates authorization url
    * Client gets redirect and fetches token
    * Client sends access_token to GET /api/user and gets back username
* [x] Server POST /api/quiz and GET /api/quiz
    * `npm install -D jest supertest`
* [x] Client starts quiz
    * When user is logged in and GET /api/quiz returns nothing, "start quiz" is available
    * When user clicks "start", client calls POST /api/quiz and then refreshes to call GET /api/quiz again
    * Server stores quiz status on session
* [x] Client display quiz status based on session
* [x] Client responds to quiz answer
* [x] When all answers are complete, client displays end state
