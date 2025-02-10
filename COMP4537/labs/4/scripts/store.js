const xhttp = new XMLHttpRequest();
const validate = new Validation();



document.addEventListener(CONTENT_LOADED, () => {
    const ui = new Ui();
    ui.buildStore();

    const form = document.getElementById(SUBMIT_FORM);
    
    form.addEventListener(SUBMIT, (event) => {
        event.preventDefault();
        let word = document.getElementById(WORD).value;
         const definition = document.getElementById(DEFINITION).value;



         if (!validate.validateInput(word) || !validate.validateInput(definition)) {
            alert(msg.Validity);
         } else {
            word = word.toLowerCase();
            console.log(word);

            const data = JSON.stringify({
                word: word,
                definition: definition
            });

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    alert(xhttp.responseText);
                }
            };

            xhttp.open(POST, API_LINK_STORE, true);
            xhttp.setRequestHeader(CONTENT_TYPE, APP_JSON);
            xhttp.send(data);
         }

    })
})


