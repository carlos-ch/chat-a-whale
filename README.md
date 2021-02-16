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
- time / date

### Handling data

The fact that two separate users in separate computers will be able to communicate mean that we will need to handle and store data and make it possible to share between the two.
Docker volumes is the main way to do that.

## Usage

```js
var chatAWhale = require('chat-a-whale');

console.log('hello warld');
```

outputs

```
hello warld
```

## API

```js
var chatAWhale = require('chat-a-whale');
```

See [api_formatting.md](api_formatting.md) for tips.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install chat-a-whale
```

## Acknowledgments

chat-a-whale was inspired by the need of discovery. Docker is a fascinating technology that has got my interest since I first heard about it. This gives me the opportunity to explore many of it's features.

## See Also

- ...(link)
- ...

## License

MIT
