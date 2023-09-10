class CreatePage
{
    static Draw()
    {
        let centerContainer = document.querySelector(".center-container");
        centerContainer.innerHTML = this.#html;

        this.#SetNavEvents();
        this.#CreateQuestionContainer();
        this.#Quiz = null;
    }

    static #SetNavEvents()
    {
        document.querySelector("#menu-button").addEventListener("click", () => {
            StartPage.Draw();
        });

        document.querySelector("#save-button").addEventListener("click", () => {
            this.#CreateQuiz();
        });
    }

    static #Quiz = null;

    static #CreateQuiz()
    {
        let quizName = document.querySelector("#quizname-input").value;
        if(quizName.length == 0)
            return;
        
        let quizDescription = document.querySelector("#quizdescription-input").value;
        if(quizDescription.length == 0)
            return;

        //Loop through all questions and then all choices
        let questions = [];
        let questionContainer = document.querySelector(".create-question-container");
        for(let i = 0; i < questionContainer.children.length; i++)
        {
            let questionBox = questionContainer.children[i];

            let questionText = questionBox.querySelector("#question-input").value;
            if(questionText.length == 0)
                return;

            let choices = [];
            let choiceContainer = questionBox.querySelector(".create-choice-container");
            for(let j = 0; j < choiceContainer.children.length; j++)
            {
                let choiceBox = choiceContainer.children[j];

                let choiceText = choiceBox.querySelector("#choice-input").value;
                if(choiceText.length == 0)
                    return;

                let choiceSelect = choiceBox.querySelector("#choice-select");
                let choiceValue = (choiceSelect.value === "true");

                //Create choice object
                let choice = new Choice(choiceText, choiceValue);
                choices.push(choice);
            }

            //Create question Object
            let question = new Question(questionText, choices);
            questions.push(question);
        }

        //Create quiz object / or take the already finished one
        if(this.#Quiz === null)
        {
            this.#Quiz = new Quiz(quizName, quizDescription, questions);
            this.#Quiz.Save();
            return;
        }

        this.#Quiz.Name = quizName;
        this.#Quiz.Description = quizDescription;
        this.#Quiz.Questions = questions;
        this.#Quiz.Save();
        return;
    }

    static #CreateQuestionContainer()
    {
        let test = document.querySelector(".create-container");

        let divContainer = document.createElement("div");
        divContainer.className = "create-question-container";

        divContainer.appendChild(this.#CreateQuestionBox());

        let buttonAddQuestion = document.createElement("button");
        buttonAddQuestion.innerText = "Add Question";
        buttonAddQuestion.id = "addquestion-button";

        buttonAddQuestion.addEventListener("click", () => {
            divContainer.appendChild(this.#CreateQuestionBox());
        });

        test.appendChild(divContainer);
        test.appendChild(buttonAddQuestion);
    }

    static #CreateQuestionBox()
    {
        let divBox = document.createElement("div");
        divBox.className = "create-question-box";

        let divItemContainer = document.createElement("div");
        divItemContainer.className = "create-question-item-container";

        let divAddChoice = document.createElement("div");

        let divItem = document.createElement("div");
        divItem.className = "create-question-item";

        let divChoiceContainer = document.createElement("div");
        divChoiceContainer.className = "create-choice-container";

        //
        let pQuestion = document.createElement("p");
        pQuestion.innerText = "Question";
        divItem.appendChild(pQuestion);

        let iQuestion = document.createElement("input");
        iQuestion.type = "text";
        iQuestion.id = "question-input";
        divItem.appendChild(iQuestion);

        divItemContainer.appendChild(divItem);

        //

        divChoiceContainer.appendChild(this.#CreateChoiceBox());
        divChoiceContainer.appendChild(this.#CreateChoiceBox());


        //

        let buttonAddChoice = document.createElement("button");
        buttonAddChoice.innerText = "Add Choice";
        buttonAddChoice.id = "addchoice-button";

        //hook
        buttonAddChoice.addEventListener("click", () => {
            //Count how many boxes there are

            if(divChoiceContainer.childElementCount === 4)
                return;

            divChoiceContainer.appendChild(this.#CreateChoiceBox());
        });        

        divItemContainer.appendChild(divChoiceContainer);

        divBox.appendChild(divItemContainer);

        divAddChoice.appendChild(buttonAddChoice);

        divBox.appendChild(divAddChoice);

        return divBox;
    }

    static #CreateChoiceBox()
    {
        let divBox = document.createElement("div");
        divBox.className = "create-choice-box";

        let pChoice = document.createElement("p");
        pChoice.innerText = "Choice";
        divBox.appendChild(pChoice);

        let iChoice = document.createElement("input");
        iChoice.type = "text";
        iChoice.id = "choice-input";
        divBox.appendChild(iChoice);

        let pCorrect = document.createElement("p");
        pCorrect.innerText = "Is correct";
        divBox.appendChild(pCorrect);

        let sCorrect = document.createElement("select");
        sCorrect.id = "choice-select";
        
        let oYes = document.createElement("option");
        oYes.value = "true";
        oYes.innerText = "Yes";
        sCorrect.appendChild(oYes);

        let oNo = document.createElement("option");
        oNo.value = "false";
        oNo.innerText = "No";
        sCorrect.appendChild(oNo);

        divBox.appendChild(sCorrect);

        return divBox;
    }

    static #html = '' + 
    '<!--item 1-->' + 
    '            <div class="create-container">' + 
    '' + 
    '                <!--item 1-->' + 
    '                <h3>Welcome to quiz creator</h3>' + 
    '' + 
    '                <!--item 2-->' + 
    '                <div class="create-quiz-item">' + 
    '                    <p>Quiz name</p>' + 
    '                    <input type="text" id="quizname-input">' + 
    '                    <p>Description</p>' + 
    '                    <input type="text" id="quizdescription-input">' + 
    '                </div>' + 
    '' + 
    '            </div>' + 
    '' + 
    '            <!--item 2-->' + 
    '            <div class="create-nav-container">' + 
    '                <button id="menu-button">Menu</button>' + 
    '                <button id="save-button">Save</button>' + 
    '            </div>' + 
    '';
}