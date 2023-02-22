export const getCookieParam = (name) => {
  const cookies = document.cookie.replaceAll(" ", "").split(';');
  if (document.cookie.indexOf(name) != -1) {
    return cookies.find((c) => c.startsWith(name + '=')).split('=')[1].toString();
  }
}

export const setCookie = (name, param) => {
  document.cookie = `${name}=${param}`
}