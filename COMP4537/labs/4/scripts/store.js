const xhttp = new XMLHttpRequest();
const validate = new Validation();


document.addEventListener(CONTENT_LOADED, () => {
    const ui = new Ui();
    ui.buildStore();

    const form = document.getElementById(SUBMIT_FORM);

    form.addEventListener(SUBMIT, (event) => {
         const word = document.getElementById(WORD).value;
         const definition = document.getElementById(DEFINITION).value;


         if (!validate.validateInput(word) || !validate.validateInput(definition)) {
            alert(msg.Validity);
         } else {
            const data = JSON.stringify({
                word: word,
                definition: definition
            });

            xhttp.open(POST, API_LINK_STORE, true);
            xhttp.setRequestHeader(CONTENT_TYPE, APP_JSON);
            xhttp.send(data);
            alert(msg.Success);
         }

    })
})


