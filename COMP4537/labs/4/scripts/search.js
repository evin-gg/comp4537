const xhttp = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submitForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const word = document.getElementById("word").value;

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                const response = JSON.parse(xhttp.responseText);
                document.getElementById("responseBox").innerText(response.definition);
            }
        }

        xhttp.open("POST", "https://4537api.banunu.dev/labs/4/definitions/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        const data = JSON.stringify({word: word});
        console.log(data);
        xhttp.send(data);

    });
});