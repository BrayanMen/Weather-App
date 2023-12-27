import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Card.module.css';

const API_KEY = '6d52a14de0208d6196d773d0941e78c3';

export default function Ciudad() {
  const [city, setCity] = useState(null);
  const { id } = useParams();

  const onClose = () => setCity(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso.main) {
          const {
            main: { temp_min, temp_max, temp, humidity },
            weather: [{ icon, description, main }],
            wind: { speed },
            clouds: { all },
            coord: { lat, lon },
            id,
            name,
          } = recurso;

          const ciudad = {
            min: Math.round(temp_min),
            max: Math.round(temp_max),
            img: icon,
            descr: description,
            id,
            wind: speed,
            temp:  Math.round(temp - 273.15),
            name,
            weather: main,
            clouds: all,
            humidity,
            latitud: lat,
            longitud: lon,
          };

          setCity(ciudad);
        } else {
          setCity(null);
        }
      })
      .catch((error) => {
        console.error("Error al cargar la ciudad:", error);
        setCity(null);
      });
  }, [id]);

  return (
    <div>
      {city ? (
        <div className={style.city}>
          <button onClick={onClose} className={style.cardButton}>
            x
          </button>
          <h2>{city.name}</h2>
          <p>Temperatura: {city.temp} ºC</p>
          <p>Clima: {city.weather}</p>
          <p>Viento: {city.wind} km/h</p>
          <p>Cantidad de nubes: {city.clouds}</p>
          <p>Latitud: {city.latitud}º</p>
          <p>Longitud: {city.longitud}º</p>
        </div>
      ) : (
        <h1 className={style.card}>
          {city === null ? "Ciudad no encontrada" : "Cargando..."}
        </h1>
      )}
    </div>
  );
}