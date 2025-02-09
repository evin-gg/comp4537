class Validation {
    validateInput(word) {
        if (!word || typeof word !== "string" || word.trim() === "") {
            return false;
        }
        
        const hasNumbers = /\d/.test(word);

        return !hasNumbers;
    }
}

const xhttp = new XMLHttpRequest();

const validate = new Validation();


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submitForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
         const word = document.getElementById("word").value;
         const definition = document.getElementById("definition").value;


         if (!validate.validateInput(word) || !validate.validateInput(definition)) {
            alert("Input cannot have numbers or be empty ");
         } else {
            console.log("Logic");
            const data = JSON.stringify({
                word: word,
                definition: definition
            });
            
            console.log(data);

            xhttp.open("POST", "https://4537api.banunu.dev/labs/4/definitions", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(data)
         }

    })
})


