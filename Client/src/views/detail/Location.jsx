import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



export default function LocationPage(){
   const { id } = useParams();
   const navigate = useNavigate();
   const locations = useSelector((state) => state.locations)

  const location = locations.find(location => location.id == id)
  console.log(location);

  const goBack = () => {
    navigate(-1);
  };

    return (
      <div>

        <div>
          <h2>{location.name}</h2>
        </div>

        <div>
          <div>
            <h3>Type:</h3>
            <p>{location.type}</p>
          </div>

          <div>
            <h3>Dimension:</h3>
            <p>{location.dimension}</p>
          </div>

          <div>
            <h3>Residents:</h3>
            <p>{location.residents}</p>
          </div>

          <div>
            <button onClick={goBack}>
          BACK
        </button>
          </div>

        </div>
      </div>
    );
  }