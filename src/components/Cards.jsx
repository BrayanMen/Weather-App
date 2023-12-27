import React from 'react';
import Card from './Card';
import style from './Cards.module.css';

export default function Cards({ cities, onClose }) {
  return (
    <div className={style.cards}>
      {cities ? (
        cities.map((c) => (
          <React.Fragment key={c.id}>
            {c ? (
              <Card
                id={c.id}
                max={c.max}
                min={c.min}
                name={c.name}
                img={c.img}
                temp={c.temp}
                onClose={() => onClose(c.id)}
              />
            ) : (
              <div className={style.card}>
                <h1>
                  No hay ciudades disponibles
                </h1>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className={style.card}>
          <h1>Ingrese Ciudad </h1>
        </div>
      )}
    </div>
  );
}
