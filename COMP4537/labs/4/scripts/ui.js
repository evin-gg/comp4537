const WORD_LABEL = "wordLabel";
const DEF_LABEL = "definitionLabel";
const CONTENT_LOADED = "DOMContentLoaded";
const SUBMIT_FORM = "submitForm";
const SUBMIT = "submit";
const INPUT = "input";
const WORD = "word";
const DEFINITION = "definition";
const ERR_103 = "Request# 103, word \'";
const NOT_FOUND = "\' not found!";
const RESP_BOX = "responseBox";
const GET = "GET";
const API_LINK = "https://4537api.banunu.dev/labs/4/definitions?word=";
const API_LINK_STORE = "https://4537api.banunu.dev/labs/4/definitions"
const CONTENT_TYPE = "Content-Type";
const APP_JSON = "application/json";
const STRING = "string"
const EMPTY = "";
const POST = "POST";

class Ui {
    buildStore() {
        document.getElementById(WORD_LABEL).innerHTML = msg.Word;
        document.getElementById(DEF_LABEL).innerHTML = msg.Definition;
    }

    buildSearch() {
        document.getElementById(WORD_LABEL).innerHTML = msg.Word;

        const button = document.createElement(INPUT);
        button.type = SUBMIT;
        button.value = msg.Submit;


        document.getElementById(SUBMIT_FORM).appendChild(button);
    }
}