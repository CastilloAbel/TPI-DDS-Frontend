import axios from "axios";

const urlResource = "https://tpi-dds-backend.onrender.com/api/autos";

async function Buscar(nombre) {
  const resp = await axios.get(urlResource, {
    params: {nombre},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.id);
  return resp.data;
}

async function Grabar(item) {
    if (item.id === 0) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.id, item);
    }
  }
  
async function Eliminar(item) {
  if(item.id !== 0){
    await axios.delete(urlResource + "/" + item.id)
  }
}  
  export const autosService = {
    Buscar,BuscarPorId,Grabar,Eliminar
  };
  