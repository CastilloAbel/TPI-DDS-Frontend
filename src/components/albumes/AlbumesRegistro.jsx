import React from "react";
import { useForm } from "react-hook-form";

export default function AlbumesRegistro({
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
  console.log(Item);
  if (!Item) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Titulo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Titulo">
                Titulo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Titulo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Titulo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Titulo && touchedFields.Titulo && (
                <div className="invalid-feedback">
                  {errors?.Titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Artista */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Artista">
                Artista<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Artista", {
                  required: { value: true, message: "Artista es requerido" },
                  minLength: {
                    value: 4,
                    message: "Artista debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Artista debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Artista ? "is-invalid" : "")
                }
              />
              {errors?.Artista && touchedFields.Artista && (
                <div className="invalid-feedback">
                  {errors?.Artista?.message}
                </div>
              )}
            </div>
          </div>
          {/* campo FechaLanzamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAlta">
                Año<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaLanzamiento", {
                  required: { message: "Anio es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaLanzamiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaLanzamiento?.message}
              </div>
            </div>
          </div>

          {/* campo idgenero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="idgenero">
                idgenero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("idgenero", {
                  required: {
                    value: true,
                    message: "idgenero es requerido",
                  },
                })}
                className={
                  "form-control" + (errors?.idgenero ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.idgenero?.message}
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
