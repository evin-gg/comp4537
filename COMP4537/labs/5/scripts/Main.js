const ui = new Ui();

document.addEventListener("DOMContentLoaded", () => {
    ui.build();
    const api = 'https://4537api.banunu.dev/labs/5/sql'

    document.getElementById("ins-rows").addEventListener("click", () => {
        fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: personData })
        })
        .then(response => response.json())
        .then(data => {
            alert(JSON.stringify(data, null, 2));
        })
        .catch(error => {
            alert(error);
        });
    });

    document.getElementById("sql-form").addEventListener("submit", (event) => {
        event.preventDefault();
        let command = document.getElementById("sql-in").value.trim();

        if(command.toLowerCase().startsWith("insert"))
        {
            fetch(api, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query: command})
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("response").innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById("response").innerHTML = error;
            })
        }

        else if(command.toLowerCase().startsWith("select"))
        {
            fetch(api + '?query=' + encodeURIComponent(command), {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById("response").innerHTML = data.error;
                } else {
                    const rows = data.map(row => {
                        return `<div>${Object.values(row).join(', ')}</div>`;
                    }).join('');
                    document.getElementById("response").innerHTML = rows;
                }
            })
            .catch(error => {
                document.getElementById("response").innerHTML = error;
            })
        }
    });
});
