class SelectPage
{
    static Draw()
    {
        let centerContainer = document.querySelector(".center-container");
        centerContainer.innerHTML = this.#html;

        this.#SetNavEvents();
        this.#CreateSelect();
    }

    static #SetNavEvents()
    {
        document.querySelector("#menu-button").addEventListener("click", () => {
            StartPage.Draw();
        });

        
        let startButton = document.querySelector("#start-button")
        startButton.addEventListener("click", () => {
            if(startButton.className != "radio-button-enabled")
                return;

            let selectedButton = document.querySelector(".radio-button-selected");
            if(selectedButton == null)
                return;

            let quizzes = GetFromLocalStorage("quizzes");
            if(quizzes == null)
                return;
            
            let quiz = Object.assign(new Quiz(), quizzes.find(quiz => quiz.Id == selectedButton.id));

            PlayPage.Draw(quiz);
        });

    }

    static #CreateSelect()
    {
        let container = document.querySelector(".radio-button-container");

        //Get all buttons from each Quiz
        let quizzes = GetFromLocalStorage("quizzes");
        if(quizzes == null)
            return;

        for(let i = 0; i < quizzes.length; i++)
        {
            let quiz = Object.assign(new Quiz(), quizzes[i]);
            let button = quiz.CreateRadioButton();
            
            button.addEventListener("click", () => {
                this.#SwitchRatioButtons(button);
            });

            container.appendChild(button);
        }

        //Append them to container / Hook them

        return;
    }

    static #SwitchRatioButtons(caller)
    {
        let radioButtons = document.querySelectorAll(".radio-button");
        //reset
        for(let i = 0; i < radioButtons.length; i++)
            radioButtons[i].className = "radio-button";
    
        caller.classList.add("radio-button-selected");
    
        //enable the disabled submit button after selection
        let disabledButton = document.querySelector(".radio-button-disabled");
        if(disabledButton == null)
            return;
        disabledButton.className = "radio-button-enabled";
    }

    static #html = '' + 
    '<div class="select-container">' + 
    '' + 
    '                <h3>Select a quiz and press start !</h3>' + 
    '' + 
    '                <div class="radio-button-container">' + 
    '' + 
    '                </div>' + 
    '' + 
    '                <div class="submit-radio-button-container">' + 
    '                    <button id="start-button" class="radio-button-disabled">Start</button>' + 
    '                </div>' + 
    '' + 
    '            </div>' + 
    '            <div class="select-nav-container">' + 
    '                <button id="menu-button">Menu</button>' + 
    '            </div>' + 
    '';
}

/*
function SwitchRadioButton(caller)
{
    let radioButtons = document.querySelectorAll(".radio-button");
    //reset
    for(let i = 0; i < radioButtons.length; i++)
        radioButtons[i].className = "radio-button";

    caller.classList.add("radio-button-selected");

    //enable the disabled submit button after selection
    let disabledButton = document.querySelector(".radio-button-disabled");
    disabledButton.className = "radio-button-enabled";

    return;
}
*/