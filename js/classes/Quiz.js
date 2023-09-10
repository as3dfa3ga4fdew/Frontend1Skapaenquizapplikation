class Quiz{

    constructor(name, description, questions)
    {
        this.Id = GenerateRandomString(20);
        this.Name = name;
        this.Description = description;
        this.Questions = questions;
    }

    #OnQuestion = 0;
    NextQuestion()
    {
        if(this.#OnQuestion == this.Questions.length)
            return false;
        
        let question = this.Questions[this.#OnQuestion];
        
        let container = document.querySelector(".play-question-container");
        
        let h2 = document.createElement("h2");
        h2.id = "quiz-name";
        h2.innerText = this.Name;
        container.appendChild(h2);

        let h3 = document.createElement("h3");
        h3.id = question.Id;
        h3.className = "question-text";
        h3.innerText = question.Text;
        container.appendChild(h3);

        let choiceContainerTop = document.createElement("div");
        choiceContainerTop.className = "radio-button-container";

        let choiceContainerBot = document.createElement("div");
        choiceContainerBot.className = "radio-button-container";

        let choices = question.Choices;
        for(let i = 0; i < choices.length; i++)
        {
            let choice = Object.assign(new Choice(), choices[i]);

            let button = choice.GetRadioButton();

            button.addEventListener("click", () => {
                this.#SwitchRatioButtons(button);
            });

            if(i < 2)
            {
                
                choiceContainerTop.appendChild(button);
            }
            else
            {   
                choiceContainerBot.appendChild(button);
            }
        }

        container.appendChild(choiceContainerTop);

        if(choiceContainerBot.children.length > 0)
            container.appendChild(choiceContainerBot);

        this.#OnQuestion++;

        return true;
    }

    #SwitchRatioButtons(caller)
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

    Save()
    {
        let quizzesKey = "quizzes";

        //If completly new
        if(GetFromLocalStorage(quizzesKey) === null)
        {
            SetToLocalStorage(quizzesKey, [this]);
            return;
        }

        let quizzes = GetFromLocalStorage(quizzesKey);

        
        let quiz = quizzes.find(quiz => quiz.Id == this.Id);
        if(quiz == null)
        {
            //if quiz doesn't exist add
            quizzes.push(this);
        }
        else
        {
            //If quiz exists update
            let index = quizzes.findIndex(quiz => quiz.Id === this.Id);
            quizzes[index] = this;
        }

        SetToLocalStorage(quizzesKey, quizzes);

        return;
    }

    CreateRadioButton()
    {
        let button = document.createElement("button");
        button.id = this.Id;
        button.className = "radio-button";
        button.innerText = this.Name;

        return button;
    }


    static getById(id)
    {
        let quizzes = GetFromLocalStorage("quizzes");
        
        for(var i in quizzes)
        {
            let quiz = Object.assign(new Quiz(), quizzes[i]);
    
            if(quiz.getId() === id)
            {    
                return quiz;
            }
        }
        
        return null;
    }
}