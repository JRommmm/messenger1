# Messenger

A one-to-one realtime chat app. 

![demo](https://github.com/valerieingmann/messenger1/blob/main/messenger.gif)

## Technologies
- React
- Redux
- Material-UI (followed a Sketch spec)
- Socket.io
- Node.js
- Express
- PostgreSQL & Sequelize
- Passport.js & express-session

## Running Application Locally

```
psql
CREATE  DATABASE messenger;
\q

cd server
npm install

// seed the database
npm run seed

npm run dev
```

Create a .env file in the server directory and add your session secret

```
SESSION_SECRET = "your session secret"
```
