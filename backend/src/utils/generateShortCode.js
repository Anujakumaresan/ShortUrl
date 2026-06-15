// Custom Base62 generator (to avoid extra dependencies like nanoid if possible)
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LENGTH = 6;

const generateShortCode = () => {
  let result = '';
  for (let i = 0; i < LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    result += ALPHABET[randomIndex];
  }
  return result;
};

module.exports = generateShortCode;
