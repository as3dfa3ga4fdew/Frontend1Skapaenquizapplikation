class Question
{
    constructor(text, choices)
    {
        this.Id = GenerateRandomString(20);
        this.Text = text;
        this.Choices = choices;
    }
}