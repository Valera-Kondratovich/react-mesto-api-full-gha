import React from "react";
import checkImage from "../images/check.svg";
import crossImage from "../images/cross.svg";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({ isOpen, onClose, onError }) {

  function selectionText(onError) {
    if (onError) {
      const textError = "Что-то пошло не так! Попробуйте ещё раз.";
      return textError;
    } else {
      const textCheck  = "Вы успешно зарегистрировались!";
      return textCheck;
    }
  }


  return (
    <PopupWithForm isOpen={isOpen} name="infoTooltip" onClose={onClose}>
      <div className="popup__status">
      {onError ? (<img className="popup__image-status" src={crossImage} alt="ошибка"/>):(<img className="popup__image-status" src={checkImage} alt="успех"/>)}
        <p className="popup__title">{selectionText(onError)}</p>
      </div>
    </PopupWithForm>
  );
}

export default InfoTooltip;
