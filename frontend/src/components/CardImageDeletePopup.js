import React from "react";


function CardImageDeletePopup({isOpen, onClose, onSubmit, title, name}){
  return(
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__body">
          <div className="popup__content">
            <form className={`popup__form popup__trash`} name={name} noValidate onSubmit={onSubmit}>
              <h2 className="popup__title">{title}</h2>
              <button className="popup__button-save" type="submit" >
                Да
              </button>
              <button className="popup__button-close" type="button" onClick={onClose}/>
            </form>
          </div>
        </div>
      </div>
  )
}


export default CardImageDeletePopup
