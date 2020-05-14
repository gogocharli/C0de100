const fetch = require('node-fetch');

function mapData(data) {
  const characters = []; // Change character id to character

  data.forEach(({
    char_id,
    name
  }) => {
    name = name.split(' ');
    characters.push({
      id: char_id,
      firstName: name[0],
      lastName: name[name.length - 1],
      abbr: name[0][0]
    });
  });
  return characters;
}

module.exports = async () => {
  const res = await fetch('https://www.breakingbadapi.com/api/characters?limit=5');
  const results = await res.json();
  const content = await mapData(results);
  return content;
};