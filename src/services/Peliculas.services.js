import axios from "axios";

const urlResource = "http://localhost:4000/api/peliculas";


async function Buscar(Titulo) {
    try {
      const resp = await axios.get(urlResource, {
        params: { Titulo },
      });
      console.log(resp);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar el Titulo.");
    }
}
  
async function BuscarPorId(item) {
    try {
      const resp = await axios.get(urlResource + "/" + item.idPelicula);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar la pelicula por ID.");
    }
}
  
async function Grabar(item) {
    console.log(item);
    try {
      if (!item.idPelicula) {
        const resp = await axios.post(urlResource, item);
        return resp.data;
      } else {
        await axios.put(urlResource + "/" + item.idPelicula, item);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al grabar la Pelicula");
    }
}
  
async function Eliminar(id) {
    try {
      await axios.delete(urlResource + "/" + id);
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al eliminar la Pelicula");
    }
}

export const PeliculasService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};