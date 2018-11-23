# boilerplate-graphql

# Install

```javascript
cd server
npm install
```

```javascript
cd client
npm install
```

# Start

```javascript
cd server
npm start
```

```javascript
cd client
npm start
```
# Usage

Listen for posts (subscriptions):

```javascript
subscription {
  postAdded (
    post: {
      text: "XXdddXXXXXXXXXXXX"
    }
  ) {text}
}
```

Add post:

```javascript
mutation {
  addPost (
    post: {
      text: "Good morning, sunshine!"
    }
  ) {text}
}
```