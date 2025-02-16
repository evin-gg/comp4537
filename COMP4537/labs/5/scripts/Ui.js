class Ui {
    build() {
        const insBtn = document.createElement("button");
        insBtn.textContent = msg.Ins;
        insBtn.id = "ins-rows";
        document.getElementById("ins-div").appendChild(insBtn);
    }
}