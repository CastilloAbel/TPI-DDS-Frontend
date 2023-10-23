import React, { useState} from 'react';
import moment from 'moment';
import AutosBuscar from './AutosBuscar';
import AutosListado from './AutosListado';
import AutosRegistro from './AutosRegistro';
import { autosService } from "../../services/autos.service";

function Autos() {
  const TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  const [AccionABMC, setAccionABMC] = useState('L');

  const [Nombre, setNombre] = useState('');

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)



  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])



  async function Buscar() {


    const data = await autosService.Buscar(Nombre);
    console.log(data)
    setItems(data);

    //generar array de las páginas para mostrar en select del paginador

  }



  async function BuscarPorId(item, accionABMC) {
    const data = await autosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, 'C'); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, 'M'); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      id: 0,
      nombre: null,
      marca: null,
      modelo: null,
      puertas: null,
    fecha: moment(new Date()).format("YYYY-MM-DD"),
    });
  }


  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await autosService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
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
    setAccionABMC('L');
  }
  async function Eliminar(item){
    await autosService.Eliminar(item)
    Buscar()
  }

  return (
    <div>
      <div className="tituloPagina">
        Autos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === 'L' && (
        <AutosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}

      {AccionABMC === 'L' && Items?.length > 0 && (
        <AutosListado
          {...{
            Items,
            Consultar,
            Modificar,
            Buscar,
            Eliminar,
          }}
        />
      )}

      {AccionABMC === 'L' && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}

      {AccionABMC !== "L" && <AutosRegistro {...{ AccionABMC, Item, Grabar, Volver }} /> }
    </div>
  );
}
export default Autos;
