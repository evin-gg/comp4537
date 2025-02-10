const xhttp = new XMLHttpRequest();

document.addEventListener(CONTENT_LOADED, () => {
    const ui = new Ui();

    ui.buildSearch();
    const form = document.getElementById(SUBMIT_FORM);

    form.addEventListener(SUBMIT, (event) => {
        event.preventDefault();

        let word = document.getElementById(WORD).value;

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                const response = JSON.parse(xhttp.responseText);

                if (response.definition == null) {
                    alert(ERR_103 + word + NOT_FOUND);
                }
                document.getElementById(RESP_BOX).innerHTML = response.definition;
            }
        }
        xhttp.open(GET, API_LINK + word.toLowerCase(), true);
        xhttp.setRequestHeader(CONTENT_TYPE, APP_JSON);
        xhttp.send();

    });
});