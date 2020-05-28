// Will prompt the user to authorize and then redirect to the specified uri
function authorize() {
  const clientID = '0c9e398e8f2f4e79b65220a6e57ef524';
  const redirect = 'https://100codingdays.netlify.app/Day-4/results';

  // Redirect the user to that location first
  window.location.replace(
    `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect}&scope=user-read-private&response_type=token`
  );
}

// Get the track IDs and split the array into chuncks of 50
let trackIDs = [];
function getIDs() {
  window
    .fetch('/Day-4/tracks.json')
    .then(res => res.json())
    .then(json => {
      while (json.length) {
        trackIDs.push(json.slice(0, 50));
        json.splice(0, 50);
      }
    });
}
getIDs();

// Check if the user saved tracks contain all Beyonce songs
// A regular expression to get the token from the callback response from the server
const tokenRegex = new RegExp(/access_token=([^&]*)/gi);
async function checkTracks() {
  const access_token = tokenRegex.exec(document.URL)[1];
  let results = [];
  // Since the API limit for this query is 50 results, I am making it multiple times to get all the results
  for (let i = 0; i < trackIDs.length; i++) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${trackIDs[i].join()}`,
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
}

// Update the score and ranking on the results page
function calculateScore(count) {
  const total = tracks.flat().length;
  return Math.floor((userCount * 100) / total);
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
  const score = calculateScore(count);

  // Attribute a ranking and return a string
  const ranking = giveRanking(score);

  // Update the DOM with appropriate results
  const rankingText = document.querySelector('.ranking');
  const rankingSpan = rankingText.querySelector('span');
  const scoreEl = document.querySelector('.score');

  ranking == 'Larvae'
    ? (rankingText.innerHTML = `<span>You are a…</span>${ranking}`)
    : (rankingText.innerHTML = `<span>You are a…</span>${ranking}`);

  scoreEl.innerText = score;
}

if (document.URL.includes('login')) {
  const getStarted = document.querySelector('.js-authorize');
  getStarted.addEventListener('click', e => {
    e.preventDefault();
    authorize();
  });
}

if (document.URL.includes('results')) {
  (async function () {
    const userCount = await checkTracks();
    updateRanking(userCount);
  })();
}
