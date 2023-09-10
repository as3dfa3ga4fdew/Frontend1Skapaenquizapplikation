function SetToLocalStorage(key, value)
{
    localStorage.setItem(key, JSON.stringify(value));
}
function SetToSessionStorage(key, value)
{
    sessionStorage.setItem(key, JSON.stringify(value));
}

