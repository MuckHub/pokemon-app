//api urls
export const DETAILED_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
export const POKEMON_API_URL = (pokemonsPerPage, pageOffset) => {
  return `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${pageOffset}`;
};

//routes
export const POKEMON = '/pokemon';


