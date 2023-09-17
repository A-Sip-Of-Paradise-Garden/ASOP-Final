export function capitalizeString(inputString) {
  const words = inputString.split(' ');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
};
