import React from "react";
import { useForm } from "react-hook-form";

export default function AutosRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 2,
                    message: "Nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo marca */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="marca">
                Marca<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("marca", {
                  required: { value: true, message: "Marca es requerido" },
                  minLength: {
                    value: 2,
                    message: "Marca debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Marca debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Marca ? "is-invalid" : "")
                }
              />
              {errors?.Marca && touchedFields.Marca && (
                <div className="invalid-feedback">
                  {errors?.Marca?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo modelo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="modelo">
                Modelo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("modelo", {
                  required: { value: true, message: "Modelo es requerido" },
                  minLength: {
                    value: 2,
                    message: "Modelo debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Modelo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Modelo ? "is-invalid" : "")
                }
              />
              {errors?.Modelo && touchedFields.Modelo && (
                <div className="invalid-feedback">
                  {errors?.Modelo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo puertas */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="puertas">
                Cantidad de Puertas<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("puertas", {
                  required: { value: true, message: "Puertas es requerido" },
                  min: {
                    value: 0,
                    message: "Puertas debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "Puertas debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Puertas ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Puertas?.message}</div>
            </div>
          </div>

          {/* campo Fecha */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha">
                Fecha de Compra<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha", {
                  required: { value: true, message: "Fecha es requerido" }
                })}
                className={
                  "form-control " + (errors?.Fecha ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Fecha?.message}
              </div>
            </div>
          </div>


        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
