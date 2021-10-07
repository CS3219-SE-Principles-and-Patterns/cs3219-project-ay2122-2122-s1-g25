export const saveStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const fetchStorage = (key) => {
  return localStorage.getItem(key)
}
