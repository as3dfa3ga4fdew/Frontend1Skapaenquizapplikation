function GetFromLocalStorage(key)
{
    return JSON.parse(localStorage.getItem(key));
}

function GetFromSessionStorage(key)
{
    return JSON.parse(sessionStorage.getItem(key));
}
