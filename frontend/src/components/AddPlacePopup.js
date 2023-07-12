import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

const [nameImage, setNameImage] = useState('')
const [urlImage, setUrlImage] = useState('')

useEffect(()=>{
  setNameImage ("");
  setUrlImage ("")

},[ isOpen])

function handleChangeInputNameImage(e){
  setNameImage(e.target.value)
  }

function handleChangeInputUrlImage(e){
  setUrlImage(e.target.value)
}

function handleAddPlaceSubmit(e){
  e.preventDefault()
  onAddPlace({
    name: nameImage,
    link: urlImage
  })

  }

  return (
    <PopupWithForm
        isOpen={isOpen}
        name="gallery"
        title="Новое место"
        // titleButtonSumbit="Сохранить"
        onClose={onClose}
        onSumbit={handleAddPlaceSubmit}
      >
        <input
          id="input-img-name"
          className="popup__input popup__input_header"
          type="text"
          name="name"
          placeholder="Имя картинки"
          required
          minLength={2}
          maxLength={30}
          onChange={handleChangeInputNameImage}
          value={nameImage}
        />
        <span id="input-img-name-error" className="popup__error" />
        <input
          id="input-img-url"
          className="popup__input popup__input_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeInputUrlImage}
          value={urlImage}
        />
        <span id="input-img-url-error" className="popup__error" />
        <button className="popup__button-save" type="submit">
                Сохранить
              </button>
      </PopupWithForm>
  )
}


export default AddPlacePopup
