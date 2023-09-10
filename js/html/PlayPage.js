class PlayPage
{
    static Draw(quiz)
    {
        let centerContainer = document.querySelector(".center-container");
        centerContainer.innerHTML = this.#html;

        if(quiz.NextQuestion() == false)
        {
            //Go to end page
            ResultPage.Draw(quiz);
            return;
        }

        this.#SetNavEvents(quiz);
    }

    static #SetNavEvents(quiz)
    {
        document.querySelector("#menu-button").addEventListener("click", () => {
            StartPage.Draw();
        });

        
        let startButton = document.querySelector("#next-button")
        startButton.addEventListener("click", () => {
            if(startButton.className != "radio-button-enabled")
                return;

            let selectedButton = document.querySelector(".radio-button-selected");
            if(selectedButton == null)
                return;

            let quizzes = GetFromLocalStorage("quizzes");
            if(quizzes == null)
                return;
            //Save answer
            this.#SaveAnswer();

            //Go to next quesions
            PlayPage.Draw(quiz);
        });

    }

    static #SaveAnswer()
    {
        let questionId = document.querySelector(".question-text").id;
        let choiceId = document.querySelector(".radio-button-selected").id;
        let answer = new Answer(questionId, choiceId);

        //Save it
        if(GetFromSessionStorage("answers") === null)
            SetToSessionStorage("answers", []);

        let answers = GetFromSessionStorage("answers");

        answers.push(answer);

        SetToSessionStorage("answers", answers);
    }


    static #html = '' + 
    '<div class="play-container">' + 
    '' + 
    '                <div class="play-question-container">' + 
    '                    ' + 
    '                   ' + 
    '                </div>' + 
    '                ' + 
    '' + 
    '                <div class="submit-radio-button-container">' + 
    '                    <button id="next-button" class="radio-button-disabled">Next</button>' + 
    '                </div>' + 
    '' + 
    '            </div>' + 
    '' + 
    '            <div class="play-nav-container">' + 
    '                <button id="menu-button">Menu</button>' + 
    '            </div>' + 
    '';
}