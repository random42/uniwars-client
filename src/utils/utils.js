const upperCaseFirstLetterOfEachWord = (text) => {
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
