const formId = "Input";
const inputElement = "input";
const inputId = "count";
const inputType = "number";
const buttonElement = "button";
const buttonType = "submit";
const startButton = "startButton";
const gameDiv = "gameDiv";
const gameButtonWidth = "10em";
const gameButtonHeight = "5em";
const formElement = "<form id=\"Input\"></form>";
const hexTag = "#";
const padValue = "0";
const posType = "absolute";
const pxUnit = "px";
const clickListener = "click";
const onStartup = "DOMContentLoaded";
const empty = "";
const normDiv = "div";
const promptDivElement = "<div id=\"promptDiv\"></div>";
const promptDivId = "promptDiv"
const promptId = "promptText";
divElement = "<div id=\"promptText\"></div>";

// controls state and flow of the game
class Game {
    constructor() {
        this.buttons = [];
        this.btnCount = 0;
        this.orderTracker = 1;
    }

    // validates the order of the buttons being pressed
    // used chatgpt to help me figure out setTimeout() with alert()
    validateButtonInputs(order) {
        if (order === this.orderTracker) {
            this.orderTracker++;
            if(this.orderTracker > this.btnCount) {
                setTimeout(() => {
                    alert(msg.winMessage);
                    this.reset();
                }, 100);
                
            }
        } else {
            this.revealSequence();
            setTimeout(() => {
                alert(msg.loseMessage);
                this.reset();
            }, 100);
            
        }
    }

    // generates a hex color
    // I used chatgpt to help me with the calculation 
    generateColor() {
        let randomNumber = Math.floor(Math.random() * 16777215);
        let hexColor = hexTag + randomNumber.toString(16).padStart(6, padValue);

        return hexColor;
    }

    // starts the game
    startGame(btnCount) {
        
        this.btnCount = btnCount;
        for (let i = 1; i <= btnCount; i++) {
            this.buttons.push(new GameButton(this.generateColor(), i, this));
        }

        this.moveOrder(btnCount);
    }

    // moves the buttons to a random calculation at certain intervals
    // Chatgpt assisted me in the calculations
    moveButtons(n) {
        setTimeout(() => {
            this.buttons.forEach((button, index) => {
                const buttonElement = button.btn;
                
                const buttonHeight = buttonElement.offsetHeight;
                const buttonWidth = buttonElement.offsetWidth;

                const maxTop = window.innerHeight - buttonHeight;
                const maxLeft = window.innerWidth - buttonWidth;

                const randomTop = Math.floor(Math.random() * (maxTop + 1));
                const randomLeft = Math.floor(Math.random() * (maxLeft + 1));

                buttonElement.style.position = posType;
                buttonElement.style.top = randomTop + pxUnit;
                buttonElement.style.left = randomLeft + pxUnit;
            });
        }, n);
    }
    
    // performs the correct amount of shuffles with the calculated time
    moveOrder(btnCount) {
        this.moveButtons(1000 * btnCount);
        
        for (let i = 1; i < btnCount; i++) {
            setTimeout(() => {
                this.moveButtons(0);
                if (i == btnCount - 1) {
                    this.hideSequence();
                    this.startButtonListeners();
                }
            }, btnCount * 1000 + i * 2000);
        }
    }

    // hides all of the button order numbers
    hideSequence() {
        for(let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].hideOrder();
        }
    }

    // reveals all of the button order numbers
    revealSequence() {
        for(let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].showOrder();
        }
    }

    // starts all the button listeners and makes them clickable
    startButtonListeners() {
        for(let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].startListener();
        }
    }
    
    // resets the ui and the order tracking for the game to be played again
    reset() {
        this.orderTracker = 1;
        this.ui.initUi();
    }
    
}

// A class for a singular game button 
class GameButton {
    constructor(color, order, game) {
        this.btn = document.createElement(buttonElement);

        this.btn.style.width = gameButtonWidth;
        this.btn.style.height = gameButtonHeight;
        this.btn.style.backgroundColor = color;
        this.btn.innerText = order;

        this.order = order;

        document.getElementById(gameDiv).appendChild(this.btn);

        this.game = game;
    }

    // hides the order label for this specific button instance
    hideOrder() {
        this.btn.innerHTML = empty;
    }

    // shows the order label for this specific button instance
    showOrder() {
        this.btn.innerHTML = this.order;
    }

    // makes the button clickable
    startListener() {
        this.btn.addEventListener(clickListener, () => {
            this.showOrder();
            this.game.validateButtonInputs(this.order)
        })
    }
}

// Responsible for displaying starting screen and validating settings
class Ui {
    constructor() {
        this.game = new Game();
        this.game.ui = this;
    }

    // displays the input box 
    displayInput() {
        let input = document.createElement(inputElement);
        input.id = inputId;
        input.type = inputType;
        document.getElementById(formId).appendChild(input);
    }

    // displays the start button
    displayStartButton() {
        let btn = document.createElement(buttonElement);
        btn.id = startButton;
        btn.type = buttonType;
        btn.innerText = msg.startButton;

        document.getElementById(formId).appendChild(btn);
    }

    // displays startup prompt
    displayStartingMessage() {
        let prompt = document.createElement(normDiv);
        prompt.innerText = msg.startupMessage;
        document.getElementById(promptId).appendChild(prompt);
    }

    // handles and validates the input
    inputHandler() {
        document.getElementById(formId).addEventListener(buttonType, (e) => {
            e.preventDefault();
            const btnCount = document.getElementById(inputId).value;

            if(this.validateInput(btnCount)) {
                document.getElementById(gameDiv).innerHTML = empty;
                this.game.startGame(btnCount);
            } else {
                alert(msg.paramWarning);
            }
        });
    }

    // checks if n is in proper range
    validateInput(n) {
        if(n >= 3 && n <= 7) { return  true; }
        else { return false; }
    }

    // assembles the starting screen
    initUi() {
        document.getElementById(gameDiv).innerHTML = promptDivElement;
        document.getElementById(promptDivId).innerHTML = divElement + formElement;
        this.displayStartingMessage();
        this.displayInput();
        this.displayStartButton();
        this.inputHandler();
    }
}

document.addEventListener(onStartup, () => {
    const ui = new Ui();
    ui.initUi();
})