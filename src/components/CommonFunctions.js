export const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
};