### Instuctions

The application uses a minimal api-server, which aggregates multiple github api requests.

1. Start `dev-webpack-server`: `npm install` and `npm start` - it will start development webpack server which hosts the application
2. Start `api-server`: `cd api-server`, `npm install` and `npm start` - it will listen on port 8080, and will request data from github-api

Github api for development limits request counts, if the `api-server` throws `[TypeError: contributors.map is not a function]` it means that the api is not accepting requests. Just kill and restart the server in that case.

I have put my own API token in code for the time being.

For questions: vincas.stonys@gmail.com
