# chat-a-whale

> communicate to other users with this easy-to-use app.

This live chat allows two users to communicate in real time. This app makes use of Node.js and the powerful technology of Socket.io to send and handle messages.

In it's simplest form, Chat-a-whale wil let users:

- authenticate through id
  -login with existing id
  - create new id
- send a message
- receive a message
  The app will be using the localstorage to identify user

Both the emmiter and the recipient will be able to see a log in the screen showing:

- who has _logged in_
- who has _logged out_
- _message_
- _username_ attached to respective the message
- (time / date)

### Handling data

The fact that two separate users in separate computers will be able to communicate mean that we will need to handle and store data and make it possible to share between the two.
Docker volumes is the main way to do that.

### File Structure

This repository includes two folders: one for the react app (client-side) and the second for the server with socket.io(server-side).

Please start the server and the react-app simultanuously in different terminals in order use chat-a-whale

## Usage

_To run this repository on your local machine_

- Clone repositopry
  Run in your CLI

```
git clone https://github.com/carlos-ch/chat-a-whale.git
```

- Install dependancies

Install dependacies on both `server` and `chat-app` folders
navigate to `cd chat-a-whale/server` and `cd chat-a-whale/chat-app`

- Start app
  Then, in each terminal run

```
npm start
```

<!-- ## API -->

<!--
```js
var chatAWhale = require('chat-a-whale');
```

See [api_formatting.md](api_formatting.md) for tips. -->

<!-- ## Install -->

<!--
With [npm](https://npmjs.org/) installed, run

```
$ npm install chat-a-whale
``` -->

## Acknowledgments

chat-a-whale was inspired by the need of discovery. Docker is a fascinating technology that has got my interest since I first heard about it. This gives me the opportunity to explore many of it's features.

## See Also

- [socket.io chat app](https://socket.io/get-started/chat)
- [web dev simplified tutorial](https://www.youtube.com/watch?v=tBr-PybP_9c)
- [socket.io acknowledgements](https://iabhishek.dev/post/building-a-multimedia-chat-app-using-express-socketio-redis-and-docker-part-2)

## License

MIT
