import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/User.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ onAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__home-link">
        <img className="header__logo" src={logo} alt="WTWR home" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={onAddButtonClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add Clothes
      </button>
      <NavLink className="header__profile-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
