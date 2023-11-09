/**
 * 
 * @param {*} inputString 
 * @returns capitalizes the first letter of each word in a string and lowercases the rest
 */
export function capitalizeString(inputString) {
  const words = inputString.split(' ');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
};

/**
 * 
 * @param {*} dateOfBirth 
 * @returns obtains the age from a date of birth
 */
export function ageFromDateOfBirth(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
