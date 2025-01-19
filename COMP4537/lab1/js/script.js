const ButtonWidth = "10em";
const ButtonHeight = "5em";
const BTN = "button";
const NOTES_KEY = "notes";
const EMPTY_ARRAY = "[]";
const REMOVE_BUTTON_TEXT = "Remove";
const REMOVE_BUTTON_ID = "removeButton";
const NOTES_CONTAINER_ID = "notes";
const ITEM_WRAPPER_CLASS = "itemWrapper";
const EMPTY = "";
const DIV = "div";
const TEXTAREA = "textarea";
const INPUT = "input";
const CLICK = "click";
const STORAGE = "storage";
const TIME = "time_tracker";
const TIME_W = "timeSlotW";
const TIME_R = "timeSlotR";
const INDEX_DIV_ID = "index";
const READ_LINK_ID = "readLink";
const WRITE_LINK_ID = "writeLink";
const INDEX_LINK_ID = "indexLink";
const ADD_BUTTON_ID = "addButton";
const ADD_ITEM_BUTTON_ID = "addItemButton";
const BOTTOM_BAR_ID = "bottomBar";
const READER_HTML = "reader.html";
const WRITER_HTML = "writer.html";
const INDEX_HTML = "index.html";
const GREEN = "green";
const DOMLOAD = "DOMContentLoaded";

// create customizable buttons
class Button {

    // Function to create a button
    createButton(color, text, appendId, b_id, ButtonWidth, ButtonHeight) {
        const buttonElement = document.createElement(BTN);
        buttonElement.style.width = ButtonWidth;
        buttonElement.style.height = ButtonHeight;
        buttonElement.style.backgroundColor = color;
        buttonElement.innerText = text;
        buttonElement.id = b_id;

        const parentElement = document.getElementById(appendId);
        parentElement.appendChild(buttonElement);

        this.btn = buttonElement;
    }
}

// manages storage
class Storage {

    // counts notes
    static noteCount = 0;

    // Retrieves all notes from localStorage
    static readNotes() {
        return JSON.parse(localStorage.getItem(NOTES_KEY) || EMPTY_ARRAY);
    }

    // Removes a specific note from localStorage
    static removeNote(index) {
        const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || EMPTY_ARRAY);

        notes.splice(index, 1);

        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        Storage.noteCount--;
    }

    static updateNote(index, note) {
        const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || EMPTY_ARRAY);

        notes[index] = note;
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }
}



class WriterDisplay {
    
    // Adds a new writer box with a text area and a remove button
    addWriterBox() {
        this.createWriterBox();
    }

    // Removes a note and updates the localStorage
    removeNote(index) {
        Storage.removeNote(index)
    }

    removeAllNotesDisplay() {
        const notesContainer = document.getElementById(NOTES_CONTAINER_ID);

        while (notesContainer.firstChild) {
            notesContainer.removeChild(notesContainer.firstChild);
        }
        Storage.noteCount = 0;
    }

    // Function to create a writer box with textarea and remove button
    createWriterBox(initialValue = EMPTY) {
        const notes = Storage.readNotes();

        // Create a wrapper div
        const wrapperDiv = document.createElement(DIV);
        const index = Storage.noteCount;
        wrapperDiv.className = ITEM_WRAPPER_CLASS;
        wrapperDiv.id = index;

        // Create the textarea 
        const textBox = document.createElement(TEXTAREA);
        textBox.value = initialValue; 
        wrapperDiv.appendChild(textBox);

        // Create the button
        const removeButton = document.createElement(BTN);
        removeButton.innerText = REMOVE_BUTTON_TEXT;
        removeButton.id = REMOVE_BUTTON_ID;
        wrapperDiv.appendChild(removeButton);

        if (textBox.value === EMPTY) {
            Storage.updateNote(index, EMPTY);
        }

        // Add event listener to write into localStorage when content changes
        textBox.addEventListener(INPUT, (event) => {
            Storage.updateNote(index, event.target.value);
            Time.updateTime();
            Time.displayTimeW();
        });

        // Add listener for the remove button
        removeButton.addEventListener(CLICK, () => {
            this.removeNote(index);
            document.getElementById(index).remove();
            this.updateCurrent();
            Time.updateTime();
            Time.displayTimeW();
        });

        // Add the wrapper div to the "notes" container
        document.getElementById(NOTES_CONTAINER_ID).appendChild(wrapperDiv);
        Storage.noteCount++;
    }

    // Upon opening writer.html, show current notes from localStorage
    updateCurrent() {
        this.removeAllNotesDisplay();
        const notes = Storage.readNotes();

        notes.forEach((note, index) => {
            if (notes[index] != null) {
                this.createWriterBox(note);
            }
        });
        Time.displayTimeW();
    }
}




class ReaderDisplay {

    constructor() {
        this.startStorageListener();
        this.getUpdatedNotes();
    }

    createDisplayBox(initialValue = EMPTY) {
        
        // Create a wrapper div for the textarea and button
        const wrapperDiv = document.createElement(DIV);
        const index = Storage.noteCount;
        wrapperDiv.className = ITEM_WRAPPER_CLASS;
        wrapperDiv.id = index;

        // Create the textarea element and prepopulate it with an existing note
        const textBox = document.createElement(TEXTAREA);
        textBox.value = initialValue;
        textBox.disabled = true;
        wrapperDiv.appendChild(textBox);

        document.getElementById(NOTES_KEY).appendChild(wrapperDiv);
    }

    // gets the updated notes and displays
    getUpdatedNotes() {
        this.removeAllNotesDisplay();
        const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || EMPTY_ARRAY);

        notes.forEach((note) => {
            this.createDisplayBox(note)
        });
        Time.displayTimeR();
    }

    // clears the display
    removeAllNotesDisplay() {
        document.getElementById(NOTES_KEY).innerHTML = EMPTY;
    }

    // starts the storage listener
    startStorageListener() {
        Time.displayTimeR();
        window.addEventListener(STORAGE, (event) => {
            this.getUpdatedNotes();
        });
    }
}


// time class for updating time
// got chatgpt to help with the date object
class Time {

    // updates in local storage
    static updateTime() {
        const currentTime = new Date().toLocaleTimeString();
        localStorage.setItem(TIME, currentTime);
        return currentTime;
    }

    // Retrieves the current stored time
    static getTime() {
        return localStorage.getItem(TIME) || new Date().toLocaleTimeString();
    }

    // display for the writer page time
    static displayTimeW() {
        const currentTime = this.getTime();
        document.getElementById(TIME_W).innerHTML = msg.lastStored + currentTime;
    }

    // display for the reader page time
    static displayTimeR() {
        const currentTime = this.getTime();
        document.getElementById(TIME_R).innerHTML = msg.lastUpdated + currentTime;
    }
}

class Ui {
    constructor(page) {
        this.page = page;
        this.buttons = new Button();
    }

    // nav function
    init() {
        if (this.page.includes(INDEX_HTML)) {
            this.createIndex();
        } else if (this.page.includes(READER_HTML)) {
            this.createReader();
        } else if (this.page.includes(WRITER_HTML)) {
            this.createWriter();
        }
    }

    // create the landing page
    createIndex() {
        this.buttons.createButton(GREEN, msg.read, INDEX_DIV_ID, READ_LINK_ID, ButtonWidth, ButtonHeight);
        this.buttons.createButton(GREEN, msg.write, INDEX_DIV_ID, WRITE_LINK_ID, ButtonWidth, ButtonHeight);

        document.getElementById(READ_LINK_ID).addEventListener(CLICK, (event) => {
            window.location.href = READER_HTML;
        });

        document.getElementById(WRITE_LINK_ID).addEventListener(CLICK, (event) => {
            window.location.href = WRITER_HTML;
        });
    }

    // create reader page
    createReader() {
        this.readerDisplay = new ReaderDisplay();
        this.buttons.createButton(GREEN, msg.back, BOTTOM_BAR_ID, INDEX_LINK_ID, ButtonWidth, ButtonHeight);

        document.getElementById(INDEX_LINK_ID).addEventListener(CLICK, function () {
            window.location.href = INDEX_HTML;
        });
    }

    // create writer page
    createWriter() {
        this.writerDisplay = new WriterDisplay();
        this.buttons.createButton(GREEN, msg.back, BOTTOM_BAR_ID, INDEX_LINK_ID, ButtonWidth, ButtonHeight);
        this.buttons.createButton(GREEN, msg.add, ADD_BUTTON_ID, ADD_ITEM_BUTTON_ID, ButtonWidth, ButtonHeight);

        document.getElementById(ADD_ITEM_BUTTON_ID).addEventListener(CLICK, () => {
            this.writerDisplay.addWriterBox();
            Time.updateTime();
            Time.displayTimeW();
        });

        document.getElementById(INDEX_LINK_ID).addEventListener(CLICK, function () {
            window.location.href = INDEX_HTML;
        });
        this.writerDisplay.updateCurrent();
    }
}


document.addEventListener(DOMLOAD, () => {
    const ui = new Ui(window.location.pathname);
    ui.init();
});