# FriendsLife Backend

This repository contains the relevant code for the RESTfulAPI for the FriendsLife backend.

## Setup

To install and run the API locally, follow these steps:

```console
# Step 1: Install dependencies
npm install

# Step 2: Start the Node app
npm run start
```

## Environment Variables

The app expects the following environment variables to be set:

| Name    | Description |
| -------- | ------- |
| PORT  | The port number that the Node app will listen for connections on   |
| MONGO_URI  | The MongoDB connection string   |
| SECRET_KEY  | The secret key used for the HMAC signing of requests    |
| FIREBASE_PROJECT_ID  | The related Firebase project id    |
| FIREBASE_CLIENT_EMAIL  | The related firebase client email   |
| FIREBASE_PRIVATE_KEY  | The related firebase private key   |

