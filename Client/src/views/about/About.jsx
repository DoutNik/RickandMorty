import React from "react";
import "./About.css";


export default function AboutPage() {
  return (
    <div className="about-container">
      <img
        src="C:\Users\Carlo\OneDrive\Escritorio\APPS\rick_and_morty\src\assets\photos\Charly.jpg"
        alt="Foto de Charly"
        className="profile-image"
      />
      <h1 className="text-with-background">Carlos Emanuel Klema</h1>
      <h2 className="retro-text text-with-background">Alias: Charly</h2>
      <h2 className="retro-text text-with-background">
        Nombre en clave: DoutNik
      </h2>
      <p className="text-with-background">Edad: 23 años</p>
      <p className="text-with-background">
        Estudiante de Full-stack Developer y aspirante a la CiberSeguridad
      </p>
    </div>
  );
}
