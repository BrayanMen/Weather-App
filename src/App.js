import React from 'react';
import './App.css';
import Cards from './components/Cards.jsx';
import style from './App.module.css';
import { useState } from 'react';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Ciudad from './components/Ciudad'
//import Card from './components/Card';

const apiKey = '6d52a14de0208d6196d773d0941e78c3';

function App() {
  const[cities, setCities] = useState('');

  function onSearch(ciudad){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then((recurso) => {
      if(recurso.main !== undefined){
        const ciudad = {
          min: Math.round(recurso.main.temp_min),
          max: Math.round(recurso.main.temp_max),
          img: recurso.weather[0].icon,
          id: recurso.id,
          wind: recurso.wind.speed,
          temp:  Math.round(recurso.main.temp),
          name: recurso.name,
          weather: recurso.weather[0].main,
          clouds: recurso.clouds.all,
          latitud: recurso.coord.lat,
          longitud: recurso.coord.lon
        };
        setCities(oldCities => [...oldCities, ciudad]);
      } else {
        alert("Ciudad no encontrada");
      }
    });
  }

  function onCLose(id){
    setCities(previousState => previousState.filter(city => city.id !== id))
  }

  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  };
  

  return (
    <div className={style.app}>
      <Nav onSearch={onSearch} />
      <Cards className={style.cards} cities={cities} onClose={onCLose} />
      <Routes>
        <Route exact path='/' element={<Cards/>}></Route>
      {cities&&(<Route path = '/ciudad/:id' element={<Ciudad/>} render={({match}) => 
        <Ciudad  city = {onFilter(match.params.id)}/>}>
        </Route>)}
        </Routes>
    </div>
  );
}

export default App;
