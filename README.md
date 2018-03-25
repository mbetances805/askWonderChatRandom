# Chat Random

## Design & Limitations
- Leveraged Node.js and React, Redux.

- Does not leverage a database as assuming this is a small app with minimal use. The Redux store maintains the app's state. To make this app scalable we would need to maintain a data store to keep track of users, sessions, and messages.

- Implemented the basic command `/delay` to delay displaying a message based on the users input.

- Partially implemented the command `/hop` due to time constraints, I was only able to implement updating the users' state to not being paired and clearing out messages. The command does not reassign to a new room and does not leave the socket room.

- CSS styling could be improved with more time.

- `server/socket/index.js` keeps track of users in socket rooms... ideally we should track this in a join table in a database for a cleaner and scalable design.


## Run in localhost
- run `npm install` to install packages
- run `npm run start-dev`
- open `localhost:8080/home` in browser

## Screenshots
See screenshots in `screenShots` directory
