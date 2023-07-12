const urlApi = 'https://api.mesto.kondratovich.nomoredomains.work';
//http://localhost:3001
// https://api.mesto.kondratovich.nomoredomains.work
 class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getAllCardsData() {
    return this._request(`${this._url}/cards`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
  }

  getUserData() {
    return this._request(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
  }

  patchUserData(data) {
    return this._request(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers,
    })
  }

  postCardData(data) {
    return this._request(`${this._url}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  changeLikeCardStatus(idImage, isLiked){
if (isLiked) {
  return this.putLike(idImage)
}
else {
  return this.delLike(idImage)
}
  }

  putLike(idImage) {
    return this._request(`${this._url}/cards/${idImage}/likes`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    })
  }

  delLike(idImage) {
    return this._request(`${this._url}/cards/${idImage}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
  }

  delCard(idImage) {
    return this._request(`${this._url}/cards/${idImage}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
  }

  patchUserAvatar(urlAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(urlAvatar)
    })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    }
  }
}


const api = new Api({
  url: urlApi,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api
