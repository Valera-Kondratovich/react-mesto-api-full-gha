import React from "react";
import logoPath from "../images/logo.svg";
import { Routes, Route, useNavigate, Link} from "react-router-dom";
import * as auth from "../utils/auth";

function Header({email, handleLogOut}) {
  const navigate = useNavigate()
  function onSignOut(){
    auth
      .logout()
      .then((res) => {
        if (res.ok) {
          handleLogOut();
          navigate("/sign-in")
        }
  })
      .catch((err) => console.log(err));
}

  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="логотип" />
<div className="header__wrap">
      <Routes>
        <Route path="/sign-in" element={<Link className="header__text" to ="/sign-up">Регистрация</Link>}/>
        <Route path="/sign-up" element={<Link className="header__text" to ="/sign-in">Войти</Link>}/>
        <Route path="/" element={
        <>
        <span className="header__text">{email}</span>
        <button className="header__button" onClick={onSignOut}>Выйти</button>
        </>
        }
        />
      </Routes>
      </div>
    </header>
  );
}

export default Header;
