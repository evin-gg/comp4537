

const xhttp = new XMLHttpRequest();
const validate = new Validation();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submitForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
         const word = document.getElementById("word").value;
         const definition = document.getElementById("definition").value;

         

         const data = JSON.stringify({
            // word: "\""+word+"\"", 
            word: word,
            definition: definition
        });

        console.log(data);

        xhttp.open("POST", "https://4537api.banunu.dev/labs/4/definitions/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data)
    })
})


