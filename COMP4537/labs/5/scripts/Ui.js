class Ui {
    build() {
        const insBtn = document.createElement("button");
        insBtn.textContent = msg.Ins;
        insBtn.id = "ins-rows";
        document.getElementById("ins-div").appendChild(insBtn);

        const field = document.createElement("input");
        field.id = "sql-in";
        document.getElementById("sql-form").appendChild(field);

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = msg.Submit;
        document.getElementById("sql-form").appendChild(submit);

        document.getElementById("response-label").innerHTML = msg.Response;
    }
}