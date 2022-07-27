import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Card.module.css';


const API_KEY = '6d52a14de0208d6196d773d0941e78c3'

export default function Ciudad() {

  const [city, setCity] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            descr: recurso.weather[0].description,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            humidity: recurso.main.humidity,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCity(ciudad)
        } else {
          setCity(null)
        }
      });
  }, [id])

  return city === undefined ?
    (<h1 className={style.card}>Cargando...</h1>) : city === null ?
      (<h1 className={style.card}>Ciudad no encontrada</h1>) : (
        <div>
          <div className={style.card}>
            <h2>{city.name}</h2>
            <div>Temperatura: {city.temp} ºC</div>
            <div>Clima: {city.weather}</div>
            <div>Viento: {city.wind} km/h</div>
            <div>Cantidad de nubes: {city.clouds}</div>
            <div>Latitud: {city.latitud}º</div>
            <div>Longitud: {city.longitud}º</div>
          </div>
        </div>

      )
};