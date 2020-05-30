// Get the track IDs and split the array into chuncks of 50
let trackCount = 0;
const getIDs = async function () {
  const res = await fetch('/Day-4/tracks.json');
  const data = await res.json();
  let trackIDs = [];
  while (data.length) {
    trackIDs.push(data.slice(0, 50));
    data.splice(0, 50);
  }
  trackCount = trackIDs.flat().length;
  return trackIDs;
};

// Check if the user saved tracks contain all Beyonce songs
// A regular expression to get the token from the callback response from the server
const tokenRegex = new RegExp(/access_token=([^&]*)/, 'gi');
const checkTracks = async function (tracks) {
  const token = tokenRegex.exec(document.URL)[1];
  let results = [];
  // Since the API limit for this query is 50 results, I am making it multiple times to get all the results
  for (let i = 0; i < tracks.length; i++) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${tracks[i].join()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    // Update the results array for every call made to the API
    results = await [...results, ...data];
  }

  // Return an array of the positive results
  return results.filter(el => el).length;
};

// Update the score and ranking on the results page
function calculateScore(count) {
  const total = trackCount;
  return Math.floor((count * 100) / total);
}

function giveRanking(score) {
  let ranking;
  if (score >= 0 && score < 20) {
    ranking = 'Larvae';
  } else if (score >= 20 && score < 40) {
    ranking = 'Forager Bee';
  } else if (score >= 40 && score < 60) {
    ranking = 'House Bee';
  } else if (score >= 60 && score < 80) {
    ranking = 'Worker Bee';
  } else if (score >= 80) {
    ranking = 'Soldier Bee';
  }
  return ranking;
}

function updateRanking(userCount) {
  // Calculate the score
  const score = calculateScore(userCount);

  // Attribute a ranking and return a string
  const ranking = giveRanking(score);

  // Update the DOM with appropriate results
  const rankingText = document.querySelector('.ranking');
  const rankingSpan = rankingText.querySelector('span');
  const scoreEl = document.querySelector('.score span');

  rankingText.innerHTML = `<span>You are a…</span>${ranking}`;
  scoreEl.innerText = score;
}

if (document.URL.includes('callback')) {
  (async function () {
    const beyonceTracks = await getIDs();
    const userCount = await checkTracks(beyonceTracks);
    updateRanking(userCount);
  })();
}
