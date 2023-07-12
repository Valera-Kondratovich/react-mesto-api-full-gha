import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth"

function Login({handleLogin, handleUserData, handleCardsData}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
const navigate = useNavigate()

const handleChange=(e)=>{
  const name = e.target.name;
  const value = e.target.value;
  setFormValue({
    ...formValue,
    [name]:value
  })
}

const onLogin=(e)=>{
  e.preventDefault();
  const email = formValue.email;
  const password = formValue.password;
  auth.login(password, email)
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then((res)=> {
      handleUserData(res);
      handleLogin(email);
      handleCardsData();
      navigate("/")
    // }
    })
  .catch(err=> console.log(err))

}
  return (
    <form className="login" name="login"
    noValidate
    onSubmit={onLogin}>
    <h2 className="login__title">
      Вход
    </h2>
    <input className="login__input"
    type="email"
    placeholder="Email"
    name="email"
    onChange={handleChange}

    required>
    </input>

    <input className="login__input"
    type="password"
    placeholder="Пароль"
    name="password"
    onChange={handleChange}
    required>
    </input>

    <button className="login__submit"
    type="submit">
      Войти
    </button>
    </form>
  );
}

export default Login;
