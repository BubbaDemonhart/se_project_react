import { useEffect, useState } from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDeleteItem(card._id ?? card.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name || "Garment preview"}
          className="modal__image"
        />
        <div className="modal__details">
          <div className="modal__details-row">
            <div>
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              type="button"
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal__confirm-overlay" role="dialog" aria-modal="true">
          <div className="modal__confirm">
            <p className="modal__confirm-text">
              Are you sure you want to delete this item?
              <span className="modal__confirm-subtext">
                This action is irreversible.
              </span>
            </p>

            <button
              type="button"
              className="modal__confirm-button modal__confirm-button_type_delete"
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>

            <button
              type="button"
              className="modal__confirm-button modal__confirm-button_type_cancel"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
