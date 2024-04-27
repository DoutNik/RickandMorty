import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



export default function DetailPage(){
   const { id } = useParams();
   const navigate = useNavigate();
    const [character, setCharacter] = useState([])

    useEffect(() => {
        axios(`/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('Character ID not found');
           }
        });
        return setCharacter({});
     }, [id]);

     const goBack = () => {
      navigate(-1);
    };

    return (
      <div>
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </div>
        <div>
          <div>
            <h3>Species:</h3>
            <p>{character.species}</p>
          </div>
          <div>
            <h3>Gender:</h3>
            <p>{character.gender}</p>
          </div>
          <div>
            <h3>Status:</h3>
            <p>{character.status}</p>
          </div>
          <div>
            <h3>Origin:</h3>
            <p>{character.origin}</p>
          </div>
          <div>
            <h3>Location:</h3>
            <p>{character.location}</p>
            <button onClick={goBack}>
          BACK
        </button>
          </div>
        </div>
      </div>
    );
  }