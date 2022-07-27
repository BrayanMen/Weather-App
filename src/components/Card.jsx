import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';


export default function Card({max, min, name, img, onClose, id}) {
  
  return (
    <div className={style.card}>
    <Link to = {`/ciudad/${id}`}>
          <h5>{name}</h5>
          </Link>
      <button onClick={onClose} className={style.cardButton}>x</button> 
      <div className={style.cardDiv}>
      <div>
        <h5>Min</h5>
      {min}
      </div>
      <div>
        <h5>Max</h5>
      {max}
      </div>
      <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="Icono" />
      </div>
    </div>
  )
};
