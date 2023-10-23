import React, { useState} from "react";
import moment from "moment";
import AlbumesBuscar from "./AlbumesBuscar";
import AlbumesListado from "./AlbumesListado";
import AlbumesRegistro from "./AlbumesRegistro";
import { AlbumesService } from "../../services/Albumes.services";



function Albumes() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");
  

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
 

  async function Buscar() {
    console.log(Titulo);
    const data = await AlbumesService.Buscar(Titulo);
    console.log(data);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await AlbumesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdAlbum: 0,
      Titulo: null,
      Artista: null,
      FechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
      idgenero: 0,
       });
  }
  
  async function Eliminar(item) {
     const resp = window.confirm(
       "Esta seguro que quiere borrar el album?"
     );
     if (resp) {
         await AlbumesService.Eliminar(item.IdAlbum);
         Buscar();
     }
  }


  async function Grabar(item) {
    // agregar o modificar
    await AlbumesService.Grabar(item);
    await Buscar();
    Volver();
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Albumes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <AlbumesBuscar
          Titulo={Titulo}
          setTitulo={setTitulo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <AlbumesListado
          {...{
            Items,
            Consultar,
            Eliminar,
            Modificar,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <AlbumesRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Albumes };
