import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getItems, addItem, removeItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    addItem({
      name: inputValues.name,
      imageUrl: inputValues.imageUrl || inputValues.imageURL,
      weather: inputValues.weatherType,
    })
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeModal();
      })
      .catch(console.error);
  };

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const deleteItemHandler = (id) => {
    removeItem(id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => (item._id ?? item.id) !== id),
        );
        closeModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="page__wrapper">
          <Header
            onAddButtonClick={onAddButtonClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  onAddButtonClick={onAddButtonClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        {/* <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          isOpen={activeModal === "add-garment"}
          name="add-garment"
          onClose={closeModal}
        ></ModalWithForm> */}
        <AddItemModal
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeModal}
          onDeleteItem={deleteItemHandler}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
