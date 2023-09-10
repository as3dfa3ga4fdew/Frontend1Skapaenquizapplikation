class StartPage
{
    static Draw()
    {
        sessionStorage.removeItem("answers");
        
        let centerContainer = document.querySelector(".center-container");
        centerContainer.innerHTML = this.#html;

        this.#SetEvents();
    }

    static #SetEvents()
    {
        document.querySelector("#play-button").addEventListener("click", () => {
            //Call selectpage
            SelectPage.Draw();
        });

        document.querySelector("#create-button").addEventListener("click", () => {
            //Call createpage
            CreatePage.Draw();
        });
    }

    static #html = '' + 
    '<!--item 1-->' + 
    '            <div class="start-container">' + 
    '                ' + 
    '                <!--item 1-->' + 
    '                <div class="start-info-item">' + 
    '                    <h1>Quizr</h1>' + 
    '                    <h2>Welcome to quizr</h2>' + 
    '                    <h3>Play a quiz or create your own, the choice is yours !</h3>' + 
    '                </div>' + 
    '' + 
    '                <!--item 2-->' + 
    '                <button id="play-button">Play</button>' + 
    '                ' + 
    '                <!--item 3-->' + 
    '                <button id="create-button">Create</button>' + 
    '' + 
    '            </div>' + 
    '';
}