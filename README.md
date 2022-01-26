# DoZ app
Project for a talent agency that manages and represents slovak actors. It serves as admin for creating, deleting, updating clients.
Application is written in TypeScript, backend in Node.js and frontend in React.js

## Run app
Application can run backend and frontend separately or concurrently
using proxy parameter in package.json in client folder


## Server
```
mkdir server
cd server
npm install express body-parser dotenv nodemon
npm install typescript --save-dev
npm install @types/node @types/express @types/body-parser @types/dotenv --save-dev
npx tsc --init
npx nodemon app.ts
```

## Client
```
mkdir client
npx create-react-app client --template typescript
npm i react-boostrap
npm i react-bootstrap-icons
```

## Database
Cloudant, NoSQL cloud database from IBM Cloud

## Deployment
App is not deployed yet but the plan is deployment on AWS, Azure or IBM Cloud