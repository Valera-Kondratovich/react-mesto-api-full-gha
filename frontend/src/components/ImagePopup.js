import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__wrap">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__picture"
          src={`${props.card.link}`}
          alt={`${props.card.name}`}
        />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
