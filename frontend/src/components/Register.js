import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth"


function Register({onInfoPopup}) {
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

const onRegister=(e)=>{
  e.preventDefault();
  const email = formValue.email;
  const password = formValue.password;
  auth.register(password, email)
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then(()=> {
    onInfoPopup(false);
    navigate("/sign-in")})
  .catch((err)=> {console.log(err);
    onInfoPopup(true);
  })

}

  return (
    <form className="register" name="register"
    noValidate
    onSubmit={onRegister}>
    <h2 className="register__title">
    Регистрация
    </h2>
    <input className="register__input"
    type="email"
    placeholder="Email"
    name = "email"
    // value={formValue.email}
    onChange={handleChange}
    required>
    </input>

    <input className="register__input"
    type="password"
    placeholder="Пароль"
    name = "password"
    // value={formValue.password}
    onChange={handleChange}
    required>
    </input>

    <button className="register__submit"
    type="submit">
      Зарегистрироваться
    </button>
    <div className="register__wrap">
    <span className="register__wrap-text">Уже зарегистрированы?</span>
    <Link className="register__wrap-link" to="/sign-in">Войти</Link>
    </div>
    </form>
  );
}

export default Register;
