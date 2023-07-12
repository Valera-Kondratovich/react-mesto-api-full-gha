import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CardImageDeletePopup from "./CardImageDeletePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isCardImageDeletePopup, setIsCardImageDeletePopup] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardsDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    handleCardsData()
  }, []);

  function tokenCheck() {
    api
      .getUserData()
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        setCurrentUser(res);
       navigate("/");
      })
      .catch((err) => console.log(err));
  }
  function handleUserData(user) {
    setCurrentUser(user)
  }
  function handleCardsData() {
    api
      .getAllCardsData()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false)
  }

  function handleInfoPopup(err) {
    setIsInfoPopupOpen(true);
    setIsError(err);
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardImageDeletePopup(false);
    setIsInfoPopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  // функция добавления удаления лайков
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handelCardImageDeletClick(card) {
    setIsCardImageDeletePopup(true);
    setCardsDelete(card);
  }

  function handleCardDeleteSumbit(e) {
    e.preventDefault();
    handleCardDelete(cardDelete);
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
        setCardsDelete({});
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(updateDataUser) {
    api
      .patchUserData(updateDataUser)
      .then((updateDataUser) => {
        setCurrentUser(updateDataUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(updateAvatar) {
    api
      .patchUserAvatar(updateAvatar)
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(newPlace) {
    api
      .postCardData(newPlace)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleLogOut={handleLogOut}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDeleteClick={handelCardImageDeletClick}
                onCardLike={handleCardLike}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="*" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/sign-in"
            element={<Login
              handleLogin={handleLogin}
              handleUserData={handleUserData}
              handleCardsData={handleCardsData}/>}
          />
          <Route
            path="/sign-up"
            element={<Register onInfoPopup={handleInfoPopup} />}
          />
        </Routes>

        <Footer />
        {/* вызов попап редактирования аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* вызов попапа редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* вызов попапа добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        {/* вызов попапа отображения картинки на весь экран */}
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {/* вызов попапа отображения уведомления об успехе или ошибке */}
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          onError={isError}
        />
        <CardImageDeletePopup
          isOpen={isCardImageDeletePopup}
          onClose={closeAllPopups}
          title="Вы уверены?"
          name="trash"
          onSubmit={handleCardDeleteSumbit}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
