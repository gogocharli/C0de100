const fetch = require('node-fetch');

function abbreviate([str1, str2]) {
  let abbr;

  if (!str2) {
    if (str1.includes('-')) {
      return abbreviate(str1.split('-'));
    } else {
      abbr = str1[0].toUpperCase();
      return abbr;
    }
  }

  abbr = str1[0].toUpperCase() + str2[0].toLowerCase();
  return abbr;
}

function mapData(data) {
  const characters = []; // Return basic character information

  data.forEach(({
    char_id,
    name
  }) => {
    name = name.split(' ');
    characters.push({
      id: char_id,
      firstName: name[0],
      lastName: name[name.length - 1],
      abbr: abbreviate(name)
    });
  });
  return characters;
}

module.exports = async () => {
  const res = await fetch('https://www.breakingbadapi.com/api/characters');
  const results = await res.json();
  const content = await mapData(results);
  return content;
};