import React, { useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext)
  return (
      <main className="content">
        <section className="profile content__profile">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          </button>
          <div className="profile__wrap">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__description">{currentUser.about}</p>
            </div>
            <button
              className="profile__button-edit"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <button
            className="profile__button-add"
            type="button"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="elements">
          {props.cards.map((item) => {
            return (
              <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteClick={props.onCardDeleteClick}/>
            );
          })}
        </section>
      </main>
  );
}

export default Main;
