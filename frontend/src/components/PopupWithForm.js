import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, onSumbit}) {
  return (
    <>
      {/* унивирсальгый попап для редактирования профиля, аватар и добавления карточки */}
      <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__body">
          <div className="popup__content">
            <form
              className={`popup__form popup__${name}`}
              name={name}
              noValidate
              onSubmit={onSumbit}
            >
              <h2 className="popup__title">{title}</h2>
              {children}
              <button
                className="popup__button-close"
                type="button"
                onClick={onClose}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
