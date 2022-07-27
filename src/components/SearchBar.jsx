import React from 'react';
import style from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  // acá va tu código
  const [city, setCity] = useState('');

  return (
    <form className={style.search} onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);
      setCity('');
    }}>
      <input
        className={style.input}
        type="text"
        placeholder="Ciudad..."
        value={city}
        onChange={e => setCity(e.target.value)} />

      <button className={style.button} type='submit'>
        <BsSearch />
      </button>
    </form>
  )
};