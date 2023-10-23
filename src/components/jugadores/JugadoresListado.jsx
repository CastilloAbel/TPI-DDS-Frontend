import React from "react";
import moment from "moment";

export default function AutosListado({
  Items,
  Consultar,
  Modificar,
  Buscar,
  Eliminar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Apellido</th>
            <th className="text-center">Goles</th>
            <th className="text-center">Fecha Nacimiento</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items.map((Item) => (
            <tr key={Item.IdJugador}>
              <td className="text-center">{Item.Nombre}</td>
              <td className="text-center">{Item.Apellido}</td>
              <td className="text-center">{Item.Goles}</td>
              <td className="text-center">
                {moment(Item.FechaNacimiento).format("DD/MM/YYYY")}
              </td>
              <td className="text-center text-nowrap">
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
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  className={"btn btn-sm btn-outline-danger"}
                  title={"Eliminar"}
                  onClick={() => Eliminar(Item)}
                >
                  <i className={"fa fa-times"}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
