import { useEffect, useState } from 'react'
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
const URL_ENPOINT = 'https://pokeapi.co/api/v2/pokemon/';

function usePokemones(){


    const [pokemones,setPokemones] = useState([]);
    const [siguienteUrl,setSiguienteUrl] = useState();
    const [verMas, setVerMas] = useState(true);

    const fecthPokemon = async (url)=>{
        const response = await fetch(url);
        const poke =await response.json();
    
        const abilities = poke.abilities.map( a => a.ability.name);
        
        const stats = poke.stats.map( s => {return {name : s.stat.name, base: s.base_stat}} )
        const types = poke.types.map( t=> t.type.name)
        return {
            id: poke.id,
            name: poke.name,
            img : poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
            abilities,
            stats,
            types,
        }
    }

    const getPokemones = async (url = URL_DEFAULT)=>{
        // Recuperar el listado de los pokemones
        const response = await fetch(url);
        const listaPokemones =  await response.json();
    
        const {next, results} = listaPokemones;
    
        // Por cada result {pokemon}, necesitamos obtener informacion
        // necesitamos esperar a que se resuelvan todas
        // por eso se recurre a Promise.all()
        const newpokemones = await Promise.all(
            results.map( (pokemon) => fecthPokemon(pokemon.url) )
        );
    
        return {next, newpokemones};
    };

    // 
    const obtenerPokemones= async ()=>{
        const {next, newpokemones} = await getPokemones();
        setPokemones(newpokemones);
        setSiguienteUrl(next);
    }

    const masPokemones = async () =>{
        const {next,newpokemones} = await getPokemones(siguienteUrl);
        setPokemones(prev =>[...prev, ...newpokemones]);
        next == null && setVerMas(false)
        setSiguienteUrl(next);
    }

    const searchPokemon = async (busqueda)=>{
        const url = `${URL_ENPOINT}${busqueda.toLocaleLowerCase()}`
        return await fecthPokemon(url);
    }

    useEffect(()=>{
       obtenerPokemones();
    },[])

    return {pokemones, masPokemones, verMas, searchPokemon}
}

export default usePokemones;