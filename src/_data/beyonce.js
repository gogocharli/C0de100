// Require environment variables for API keys
require('dotenv').config();

// Get Base64 encoder
const Base64 = require('js-base64').Base64;
const fetch = require('node-fetch');

const beyonceId = '6vWDO969PvNqNYHIOW5v0m';

// TODO Query all the songs attributed to Beyoncé
async function getToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Base64.encode(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: 'grant_type=client_credentials',
  });
  const tokenResponse = await res.json();
  return tokenResponse['access_token'];
}

// The offset to call the api from in order to get enough tracks
let offset = 0;
async function getTracks(token) {
  console.log(token);
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=Beyonce&type=track&market=US&limit=50&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data.tracks.items);
}

// Map the data to an object I can work with. While recieving an array of the tracks from that artist
function mapData(tracks = []) {
  for (let track of tracks) {
    // Check if the Beyonce ID matches with one of the artists
    // Get the Spotify ID for the track and push it into an array of Beyoncé tracks
  }
}

getToken().then(token => getTracks(token));
