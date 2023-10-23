import React from "react";
import moment from "moment";

export default function PeliculasListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Buscar
}) {
    return (
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">Titulo</th>
                <th className="text-center">Productor</th>
                <th className="text-center">FechaLanzamiento</th>
                <th className="text-center">DuracionMinutos</th>
                <th className="text-center text-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.idPelicula}>
                    <td className="text-start" >{Item.Titulo}</td>
                    <td className="text-start" >{Item.Productor}</td>
                    <td className="text-start" >{moment(Item.FechaLanzamiento).format("DD/MM/YYYY")}</td>
                    <td className="text-start" >{Item.DuracionMinutos}</td>
                    <td className="text-center text-nowrap" >
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Consultar"
                        onClick={() => Consultar(Item)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Modificar"
                        onClick={() => Modificar(Item)}
                      >
                        <i className="fa fa-pencil "></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => Eliminar(Item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>  
        </div>
      );
    }
    