import Card from "../card/Card";
import "./Cards.css";

export default function Cards({ characters, onClose }) {
  return (
    <div className="favorites-container">
      {characters.map((character) => (
        <Card key={character.id} character={character} onClose={onClose} />
      ))}
    </div>
  );
}