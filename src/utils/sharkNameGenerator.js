const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
} = require('unique-names-generator');

export default function generateSharkName() {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, names, ['shark']],
    length: 4,
    separator: '',
    style: 'capital',
  });
  return shortName;
}
