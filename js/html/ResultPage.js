class ResultPage
{
    static Draw(quiz)
    {
        let centerContainer = document.querySelector(".center-container");
        centerContainer.innerHTML = this.#html;

        let answers = GetFromSessionStorage("answers");

        //Object.assign(new Quiz(), quizzes.find(quiz => quiz.Id == selectedButton.id));
        sessionStorage.removeItem("answers");

        this.#CreateResultHtml(quiz, answers);
        this.#SetNavEvents();
    }

    static #SetNavEvents()
    {
        document.querySelector("#menu-button").addEventListener("click", () => {
            StartPage.Draw();
        });
    }
    static #CreateResultHtml(quiz, answers)
    {
        let h2 = document.querySelector("#quiz-name");
        h2.innerText = quiz.Name;

        let h3 = document.querySelector("#score-result");
       
        let div = document.querySelector(".result-p-container");

        let correctCount = 0;

        for(let i = 0; i < quiz.Questions.length; i++)
        {
            let question = Object.assign(new Question(), quiz.Questions[i]);
            let choices = question.Choices;
            let p = document.createElement("p");

            //Take answer
            let answer = Object.assign(new Answer(), answers.find(answer => answer.QuestionId == question.Id));
            
            let choice = Object.assign(new Choice(), choices.find(choice => choice.Id == answer.ChoiceId));

            let isCorrect = "incorrect";
            if(choice.IsCorrect)
            {
                isCorrect = "correct";
                correctCount++;
            }
            
            p.innerText = question.Text + " - " + choice.Text +  " - " + isCorrect;

            div.appendChild(p);
        }

        h3.innerText = "Score: " + correctCount + "/" + quiz.Questions.length;

        return;
    }

    static #html = '' + 
    '<div class="result-container">' + 
    '                <h2 id="quiz-name"></h2>' + 
    '                <h3 id="score-result"></h3>' + 
    '' + 
    '                <div class="result-p-container">' + 
    '' + 
    '                </div>' + 
    '            </div>' + 
    '' + 
    '            <div class="result-nav-container">' + 
    '                <button id="menu-button">Menu</button>' + 
    '            </div>' + 
    '';
}