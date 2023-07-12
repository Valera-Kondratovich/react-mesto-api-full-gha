const BASE_URL = 'https://api.mesto.kondratovich.nomoredomains.work'

export const register =(password, email )=>{
  return fetch(`${BASE_URL}/signup`,{
    credentials: 'include',
    method:'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email })
  })

}

export const login =(password, email )=>{
  return fetch(`${BASE_URL}/signin`,{
    credentials: 'include',
    method:'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email })
  })
}

export const logout =()=>{
  return fetch(`${BASE_URL}/signout`,{
    credentials: 'include',
    method:'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
}
