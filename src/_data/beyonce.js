// Require environment variables for API keys
require('dotenv').config();

// Get Base64 encoder
const Base64 = require('js-base64').Base64;
const fetch = require('node-fetch');

const beyonceId = '6vWDO969PvNqNYHIOW5v0m';

// Get the access token using the client credentials auth flow
const getToken = async function () {
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
};

// Search for tracks belonging to the artist
const getTracks = async function (token, offsetMax = 1) {
  let tracks = [];

  // Since the API limit for this query is 50 results, I am making it multiple times to get enouth items
  let offset = 0;
  for (let i = 0; i < offsetMax; i++) {
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
    const currentTracks = data.tracks.items;
    // Use the old tracks array and append the newly recieved set of results
    tracks = [...tracks, ...currentTracks];
    offset += 50;
  }
  return tracks;
};

// Map the data to an object I can work with. While recieving an array of the tracks
function mapData(tracks = []) {
  const trackIDs = [];
  // Tracks is an array of IDs of the different Beyonce tracks as IDs
  for (let track of tracks) {
    // Check if the Beyonce ID matches with one of the artists
    for (let { id } of track.artists) {
      if (id == beyonceId) trackIDs.push(track.id);
    }
  }
  return trackIDs;
}

async function getBeyonce() {
  const token = await getToken();
  const tracks = await getTracks(token, 4);
  const beyonceTracks = await mapData(tracks);
  console.log(
    'Node caters to you! 😌 I have successfuly retrieved',
    beyonceTracks.length,
    'Beyoncé tracks'
  );
  return beyonceTracks;
}

module.exports = getBeyonce();
