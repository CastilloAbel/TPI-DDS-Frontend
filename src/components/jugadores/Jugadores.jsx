import React, { useState } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { JugadoresService } from "../../services/Jugadores.service";

function Jugadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])

  async function Buscar() {
    const data = await JugadoresService.Buscar(Nombre);
    console.log(data);
    setItems(data);

    //generar array de las páginas para mostrar en select del paginador
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await JugadoresService.BuscarPorId(item);
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
      IdJugador: 0,
      Nombre: null,
      Apellido: null,
      FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
      Goles: 0,
    });
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await JugadoresService.Grabar(item);
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }
  async function Eliminar(item) {
    await JugadoresService.Eliminar(item);
    Buscar();
  }

  return (
    <div>
      <div className="tituloPagina">
        Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <JugadoresBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}

      {AccionABMC === "L" && Items?.length > 0 && (
        <JugadoresListado
          {...{
            Items,
            Consultar,
            Modificar,
            Buscar,
            Eliminar,
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
        <JugadoresRegistro {...{ AccionABMC, Item, Grabar, Volver }} />
      )}
    </div>
  );
}
export { Jugadores };
