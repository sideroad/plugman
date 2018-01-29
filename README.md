# <img src="https://raw.githubusercontent.com/sideroad/plugman/master/static/images/logo.png" width="40px"> plugman
- Debug WebSocket Tool

## Why plugman?
- Easy to connect websocket
- Easy to send message, save message as favorite
- Display onmessage data, be able to confirm past onmessage after connected.

## Running plugman
https://plugman.herokuapp.com


# Installation
Deploy your plugman on Heroku  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sideroad/plugman)

### Manual Installation
You can construct plugman on your local.

| Environment Variables        | Example                          | Default Value | Required | Remark                                                                                      |
|------------------------------|----------------------------------|---------------|----------|---------------------------------------------------------------------------------------------|
| GLOBAL_HOST                  | plugman.herokuapp.com              | localhost     |          | Please specify public domain                                                                |
| GLOBAL_PORT                  | 443                              | 443           |          | Please specify port                                                                         |
| PLUGMAN_GITHUB_CLIENT_ID | aaaaaaaaaaaaaaaaaa             |               |          | Please specify github client ID. Github OAuth will be disabled if does not specified        |
| PLUGMAN_GITHUB_CLIENT_SECRET   | bbbbbbbbbbbbbbbbbb |               |          | Please specify github client secret ID. This values required when KOIKI_PLUGMAN_GITHUB_CLIENT_ID has specified |
| CHAUS_PLUGMAN_CLIENT_ID   | bbbbbbbbbbbbbbbbbb |               |          | Please specify chaus client ID. This value is required. |
| CHAUS_PLUGMAN_SECRET_ID   | bbbbbbbbbbbbbbbbbb |               |          | Please specify github secret ID. This value is required. |

##### Starting application

```
npm i
npm run build
npm start
...
# app-0 ==> ✅  plugman is running, talking to API server.
# app-0 ==> 💻  Open http://localhost:3000 in a browser to view the # app.
# app-0 ### loading lang files
# app-0 ### loading lang files
# app-0 warn: parser plugin 'param' not found in block: 0
# app-0 info: Done.
```
open http://localhost:3000
