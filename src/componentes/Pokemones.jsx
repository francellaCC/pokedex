import React from 'react'

import { useEffect, useState } from 'react'

import './pokemones.css';
import './buscador.css';
import usePokemones from '../hooks/usePokemones';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cargando from './Cargando';
import DetallePokemon from './DetallePokemon';
import Buscardor from './Buscardor';


function Pokemones() {

  const  {pokemones, masPokemones, verMas,  searchPokemon} = usePokemones();
  const [mostrar, setMostrar] = useState( {mostrar : false, pokemon:{}})
  const [busqueda, setBusqueda] = useState('');

  const verPokemon = (pokemon) => setMostrar( {mostrar : true, pokemon})
  const noVerPokemon = () => {
    setMostrar( {mostrar : false, pokemon: {}})
    setBusqueda('')
  }

  function Pokemon({id,name,img, verPokemon}){
        return(
            <div className='pokemon-card' onClick={verPokemon}>
                <img className='pokemon-img' src={img} alt={name}></img>
                <p className='pokemon-titulo'>
                    <span>#{id}</span>
                    <span>{name}</span>
                </p>
            </div>
        );
    };


    const buscarPokemon = async (e)=>{
      e.preventDefault();

      if(!busqueda) return

      const pokemon = await searchPokemon(busqueda);

      setMostrar({mostrar:true , pokemon})
    }

  return (
    <>
      <DetallePokemon {...mostrar} cerrar={noVerPokemon} ></DetallePokemon>
      <Buscardor 
        busqueda={busqueda} setBusqueda={setBusqueda} 
        buscarPokemon = {buscarPokemon}
      ></Buscardor>
      
      <InfiniteScroll 
        dataLength={pokemones.length}
        next={masPokemones}
        hasMore ={verMas}
        loader ={<Cargando></Cargando>}
        endMessage={
          <h3 className='titulo' style={{gridColumn: '1/>6'}}>Lo siento no hay mas pokemones que mostrar</h3>
        }
        className='pokemon-container'
        >
        {
          pokemones.map(pokemon => <Pokemon {...pokemon}  key = {pokemon.id} verPokemon = { ()=> verPokemon(pokemon)}/>)
        }

      </InfiniteScroll>
    </>
  )
}

export default Pokemones
