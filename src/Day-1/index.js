// Make an API call and request all the characters
const getContent = async () => {
  const res = await window.fetch(
    'https://www.breakingbadapi.com/api/characters'
  );
  const results = await res.json();
  const content = await mapData(results);
  return content;
};
getContent();

let characters = [];
// Filter the response to the information we need to use in an array of objects
function mapData(data) {
  // Return basic character information
  data.forEach(({ name, nickname, occupation, portrayed, img }) => {
    characters.push({
      name: name,
      nickname: nickname,
      occupation: occupation[0],
      portrayed: portrayed,
      imageURL: img,
    });
  });
}

const charName = document.querySelector('.js-name p');
const charNickname = document.querySelector('.js-nickname p');
const charOccup = document.querySelector('.js-occupation p');
const charActor = document.querySelector('.js-portrayed p');
const charImage = document.querySelector('.character__image');
let current;

function displayInfo(element) {
  if (current) current.classList.remove('highlight');
  current = element;
  current.classList.add('highlight');
  // Define the index we want to retrieve from the characters array
  let index = Number(element.getAttribute('data-id')) - 1;
  let character = characters[index];

  charName.innerText = character.name;
  charNickname.innerText = character.nickname;
  charOccup.innerText = character.occupation;
  charActor.innerText = character.portrayed;
  charImage.style.backgroundImage = `url(${character.imageURL})`;
}

const main = document.querySelector('main');
// Replace the information in the page with the appropriate content using a data attribute on click
main.addEventListener('click', event => {
  let card = event.target.closest('.card__outer');
  if (!card) return;
  displayInfo(card);
});
