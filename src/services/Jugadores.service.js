import axios from "axios";

const urlResource = "https://tpi-dds-backend.onrender.com/api/jugadores";

async function Buscar(Nombre) {
  const resp = await axios.get(urlResource, {
    params: { Nombre },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdJugador);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdJugador === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdJugador, item);
  }
}

async function Eliminar(item) {
  if (item.IdJugador !== 0) {
    await axios.delete(urlResource + "/" + item.IdJugador);
  }
}
export const JugadoresService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};
