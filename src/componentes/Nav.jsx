import React, { useEffect, useState } from 'react'

import { Logo, Sol, Luna } from './Icon'

import './Navbar.css';

function Nav() {

  const [tema, setTema] = useState('claro');
  const handlChange=(e)=> setTema(e.target.checked ? 'oscuro' : 'claro')

  useEffect(()=>{
    document.body.setAttribute('data-tema' , tema);
  },[tema])

  return (
    <nav>
        <Logo></Logo>
        <div className='switch'>
        <Sol></Sol>
        <label>
            <input type="checkbox" name=""  hidden id="" className='check-switch'
            onChange={handlChange}
            />
            <span className='slider'></span>
        </label> 
            <Luna></Luna>
        </div>
    </nav>
  )
}

export default Nav
