import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, name, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className={`modal__content modal__content_type_${name}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <form action="" name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
