import axios from "axios";

const urlResource = "http://localhost:4000/api/albumes";


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
      const resp = await axios.get(urlResource + "/" + item.IdAlbum);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar el Album por ID.");
    }
}
  
async function Grabar(item) {
    console.log(item);
    try {
      if (!item.IdAlbum) {
        const resp = await axios.post(urlResource, item);
        return resp.data;
      } else {
        await axios.put(urlResource + "/" + item.IdAlbum, item);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al grabar el Album en la base de datos.");
    }
}
  
async function Eliminar(id) {
    try {
      await axios.delete(urlResource + "/" + id);
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al eliminar el Album");
    }
}

export const AlbumesService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};