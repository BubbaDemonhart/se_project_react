import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onAddButtonClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <h2 className="clothes-section__heading">Your items</h2>
        <button
          className="clothes-section__button"
          type="button"
          onClick={onAddButtonClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id ?? filteredCard.id}
            item={filteredCard}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}
