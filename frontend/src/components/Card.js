import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleCardDeleteClick() {
    props.onCardDeleteClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked && "elements__button-like_active"
  }`;

  return (
    <div className="elements__element">
      <img
        className="elements__img"
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        onClick={handleClick}
      />
      <div className="elements__group">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__wrap">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="elements__count">{props.card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="elements__button-trash"
          type="button"
          onClick={handleCardDeleteClick}
        />
      )}
    </div>
  );
}

export default Card;
