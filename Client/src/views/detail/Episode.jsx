import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



export default function EpisodePage(){
   const { id } = useParams();
   const navigate = useNavigate();
   const episodes = useSelector((state) => state.episodes)

  const episode = episodes.find(episode => episode.id == id)

  const goBack = () => {
    navigate(-1);
  };

    return (
      <div>
        <div>
          <h2>{episode.name}</h2>
        </div>
        <div>
          <div>
            <h3>Air date:</h3>
            <p>{episode.air_date}</p>
          </div>
          <div>
            <h3>Episode N°:</h3>
            <p>{episode.episode}</p>
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