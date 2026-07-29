import { useEffect, useState } from "react";

import "./App.css";
import {
  coordinates,
  apiKey,
  defaultClothingItems as initialDefaultClothingItems,
} from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(
    initialDefaultClothingItems,
  );

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="page__wrapper">
        <Header onAddButtonClick={onAddButtonClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        isOpen={activeModal === "add-garment"}
        name="add-garment"
        onClose={closeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="name"
            required
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            name="imageURL"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-button">
          <legend className="modal__legened">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
              value="hot"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
              value="warm"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal isOpen={activeModal === "preview"} card={selectedCard} onClose={closeModal} />
    </div>
  );
}

export default App;
