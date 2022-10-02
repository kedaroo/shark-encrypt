import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
} from 'unique-names-generator';

export default function generateSharkName() {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, names, ['shark']],
    length: 4,
    separator: '',
    style: 'capital',
  });
  return shortName;
}
