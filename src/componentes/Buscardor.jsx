import React from 'react'

import './buscador.css';
import { Buscar } from './Icon';

function Buscardor({busqueda, setBusqueda, buscarPokemon} ) {
  return (
    <>
      <h3 className='titulo'>Más de 800 pokemones, elige tu favorito</h3>
      <form className='container-buscador' onSubmit={buscarPokemon}>
        <input value= {busqueda} 
        
        onChange={(e) => setBusqueda(e.target.value)}
        
        type="text" placeholder='Encuentra tu pokemon' className='input-buscar' />
        <button className='btn-buscar' type='submit'>
            <Buscar></Buscar>
            Buscar pokemon
        </button>
      </form>
    </>
  )
}

export default Buscardor
