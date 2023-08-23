const especialCharMask = (especialChar) => {
  especialChar = especialChar.replace(/[áàãâä]/ui, 'a');
  especialChar = especialChar.replace(/[éèêë]/ui, 'e');
  especialChar = especialChar.replace(/[íìîï]/ui, 'i');
  especialChar = especialChar.replace(/[óòõôö]/ui, 'o');
  especialChar = especialChar.replace(/[úùûü]/ui, 'u');
  especialChar = especialChar.replace(/[ç]/ui, 'c');
  return especialChar;
};
// Referencia https://pt.stackoverflow.com/questions/124754/retirar-caracteres-especial-e-acentos-em-javascript

export default especialCharMask;
