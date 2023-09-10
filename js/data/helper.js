function GenerateRandomString(length)
{
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let min = 0;
    let max = chars.length;

    let randomString = "";
    let j = 0;
    for(let i = 0; i < length; i++)
    {
        let index = Math.floor(Math.random() * (max - min) + min);
        randomString += chars[index];
        j++;
    }

    return randomString;
}
