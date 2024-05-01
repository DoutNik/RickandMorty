import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../redux/action";
import "./Card.css";

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { character, onClose } = props;
  const [isFav, setFav] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);
  const [isCardVisible, setCardVisible] = useState(true);

  const favorites = useSelector((state) => state.favorites);

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    } else {
      setCardVisible(true);
    }
  }, [onClose]);

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === character.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function handleFavorite(character) {
    if (!isFav) {
      dispatch(addFavorite(character));
      setFav(true);
    } else {
      dispatch(removeFavorite(character.id));
      setFav(false);
    }
  }

  return (
    <div className={`card ${isCardVisible ? "show" : ""}`}>
      <div className="character-image">
        <img
          src={character.image}
          alt={character.name}
          onClick={navigateHandler}
        />
      </div>

      <div className="card-buttons">
        <div className="fav-button">
          {isFav ? (
            <button
              onClick={() => {
                handleFavorite(character);
              }}
            >
              ❤️
            </button>
          ) : (
            <button
              onClick={() => {
                handleFavorite(character);
              }}
            >
              🤍
            </button>
          )}
        </div>

        <div className="close-button">
          {closeBtn && (
            <button
              onClick={() => {
                onClose(character.id);
              }}
            >
              {" "}
              X{" "}
            </button>
          )}
        </div>
      </div>

      <div className="content">
        <div className="details">
          <h2 className="character-name">{character.name}</h2>
          <div className="data">
            <h3>
              ID <span>{character.id}</span>
            </h3>
            <h3>
              <span>{character.species}</span>
            </h3>
          </div>
          <div className="detailBtn">
            <button onClick={navigateHandler}>DETAILS</button>
          </div>
        </div>
      </div>
    </div>
  );
}
