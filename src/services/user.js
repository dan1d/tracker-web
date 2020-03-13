
export async function getToken() {
  try {
    const token = await localStorage.getItem('token');
    return token
  } catch(err) {
    return null
  }
}

export function loggedIn() {
  return localStorage.getItem('token');
}

export async function saveToken(token) {
  try {
    localStorage.setItem('token', token);
  } catch(err) {
    console.log(err);
  }
}

export async function logOut() {
  try {
    localStorage.removeItem('token');
    // TODO: call to api invalidation
  } catch(err) {
    console.log(err);
  }
}

// export async function getUser() {

// }