import {useDispatch, useSelector} from "react-redux";
import Card from "../../components/card/Card";

import "./Favorites.css";
import { useEffect } from "react";
import { getAllFavorites } from "../../redux/action";

function FavoritesPage() {
const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritesCopy);
  
  
  useEffect(() => {
   dispatch(getAllFavorites())
  }, [dispatch]); 


  return (
    <div className="main-container">
      {favorites.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}

export default FavoritesPage;