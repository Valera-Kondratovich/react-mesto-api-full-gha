import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputValueRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputValueRef.current.value,
    });
  }

  useEffect(() => {
    inputValueRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSumbit={handleSubmit}
    >
      <input
        id="input-avatar"
        className="popup__input popup__input_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={inputValueRef}
      />
      <span id="input-avatar-error" className="popup__error" />
      <button className="popup__button-save" type="submit">
                Сохранить
              </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
