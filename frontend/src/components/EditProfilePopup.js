import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"

      onClose={onClose}
      onSumbit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input popup__input_name"
        type="text"
        name="name"
        placeholder="Введите Ваше Имя"
        required
        minLength={2}
        maxLength={40}
        onChange={handleChangeInputName}
        value={name ?? ""}
      />
      <span id="input-name-error" className="popup__error" />
      <input
        id="input-descr"
        className="popup__input popup__input_description"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
        onChange={handleChangeInputDescription}
        value={description ?? ""}
      />
      <span id="input-descr-error" className="popup__error" />
      <button className="popup__button-save" type="submit">
                Сохранить
              </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
