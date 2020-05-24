// TODO Query all the songs attributed to Beyoncé

const SpotifyWebApi = require('spotify-web-api-node');

// * Connect to the Spotify server and request an access token
const spotifyApi = new SpotifyWebApi({
  clientId: '0c9e398e8f2f4e79b65220a6e57ef524',
  clientSecret: '950a17de5de946feb605ea806b479dae',
});

// Using the Client Credentials auth flow with the api wrapper
spotifyApi
  .clientCredentialsGrant()
  .then(
    data => {
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    err => {
      console.log(
        'And I OOP 😬! Something went wrong with retrieving an access token',
        err.message
      );
    }
  )
  .then(() => {
    spotifyApi.searchTracks('Beyonce').then(data => {
      console.log(data.body.tracks.items);
      return data.body.tracks.items;
    });
  });
