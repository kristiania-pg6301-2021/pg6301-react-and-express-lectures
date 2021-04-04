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
    * `npm install -D parcel prettier`
    * Create start script, index.html, index.jsx and a few pages to route between
* [ ] Create Express application
    * `mkdir server`
    * `cd server`
    * `npm init -y`
    * `npm install -P express`
    * `npm install -D nodemon prettier`
    * Create server.js script
* [ ] Top level app which lets user run tests and start servers for both client and server
* [ ] Login client side with Active Directory
    * Server returns discovery_url and client_id from GET /api/user
    * Client generates authorization url
    * Client gets redirect and fetches token
    * Client sends access_token to GET /api/user and gets back username
* [ ] Server POST /api/quiz and GET /api/quiz
    * `npm install -D jest supertest`
* [ ] Client starts quiz
    * When user is logged in and GET /api/quiz returns nothing, "start quiz" is available
    * When user clicks "start", client calls POST /api/quiz and then refreshes to call GET /api/quiz again
    * Server stores quiz status on session
* [ ] Client display quiz status based on session
* [ ] Client responds to quiz answer
* [ ] When all answers are complete, client displays end state
