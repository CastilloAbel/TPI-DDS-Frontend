import React from 'react';
import moment from 'moment';

export default function AutosListado({
  Items,
  Consultar,
  Modificar,
  Buscar,
  Eliminar
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Marca</th>
            <th className="text-center">Modelo</th>
            <th className="text-center">Cantidad de Puertas</th>
            <th className="text-center">Fecha de Compra</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            Items.map((Item) => (
              <tr key={Item.id}>
                <td>{Item.nombre}</td>
                <td className="text-end">{Item.marca}</td>
                <td className="text-end">{Item.modelo}</td>
                <td>{Item.puertas}</td>
                <td className="text-end">
                  {moment(Item.fecha).format('DD/MM/YYYY')}
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
                    className={
                      'btn btn-sm btn-outline-danger'
                    }
                    title={'Eliminar'}
                    onClick={() => Eliminar(Item)}
                  >
                    <i
                      className={'fa fa-times'}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}
