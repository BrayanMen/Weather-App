import React from 'react';
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import style from './SearchBar.module.css';


function Nav({ onSearch }) {
  return (
    <nav className={style.nav}>
      <Link to='/' className={style.BsHouse}> <BsHouseDoor /> </Link>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Nav;
