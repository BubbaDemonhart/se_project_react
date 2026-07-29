import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <img
          src={card.link}
          alt={card.name || "Garment preview"}
          className="modal__image"
        />
        <div className="modal__footer"></div>
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
