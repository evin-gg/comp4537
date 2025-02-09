// Chat GPT - helped with creating validation logic
class Validation {
    validateInput(word) {
        if (!word || typeof word !== STRING || word.trim() === EMPTY) {
            return false;
        }
        
        const hasNumbers = /\d/.test(word);

        return !hasNumbers;
    }
}