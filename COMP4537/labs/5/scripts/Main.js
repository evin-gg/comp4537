const ui = new Ui();

document.addEventListener("DOMContentLoaded", () => {
    ui.build();

    document.getElementById("ins-rows").addEventListener("click", () => {
        fetch("INSERT LINK HERE", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(personData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert(error);
        }); 
    });

    document.getElementById("sql-form").addEventListener("submit", (event) => {
        event.preventDefault();
        let command = document.getElementById("sql-in").value.trim();
        if(command.toLowerCase().includes("insert"))
        {
            fetch("INSERT LINK HERE", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query: command})
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("response").innerHTML = data;
            })
            .catch(error => {
                document.getElementById("response").innerHTML = error;
            })
        }

        else if(command.toLowerCase().includes("select"))
        {
            fetch("INSERT LINK HERE", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("response").innerHTML = data;
            })
            .catch(error => {
                document.getElementById("response").innerHTML = error;
            })
        }
    });
});
