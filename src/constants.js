let firstLetterUp = (text) => {
  let newText = '';
  let i = 0;
  while (i < text.length) {
    let start = i;
    while (i < text.length && text.charAt(i) === ' ') i++;
    if (i === text.length) {
      newText = newText.concat(text.slice(start,i).toUpperCase());
    } else {
      newText = newText.concat(text.slice(start,++i).toUpperCase());
    }
    start = i;
    while (i < text.length && text.charAt(i) !== ' ') i++;
    newText = newText.concat(text.slice(start,i).toLowerCase());
  }
  return newText;
}

let majors = require('../data/majors.json');
majors = majors.map(({FOD1P,major,major_category}) => {return {FOD1P,major: firstLetterUp(major),major_category}});
export const MAJORS = majors;
export const GAME_QUESTIONS_NUMBER = 5;
