import React from "react";
import Cards from "../../components/cards/Cards";
import video from "../../assets/backgrounds/videos/rainHouse.mp4";

import style from "./Home.module.css";

const Home = ({ characters }) => {
  return (
    <>
      <div className={style.home}>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Cards characters={characters} />
    </>
  );
};

export default Home;
