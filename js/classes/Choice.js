class Choice
{
    constructor(text, isCorrect)
    {
        this.Id = GenerateRandomString(20);
        this.Text = text;
        this.IsCorrect = isCorrect;
    }

    GetRadioButton()
    {
        let button = document.createElement("button");
        button.id = this.Id;
        button.className = "radio-button";
        button.innerText = this.Text;

        return button;
    }

   
}