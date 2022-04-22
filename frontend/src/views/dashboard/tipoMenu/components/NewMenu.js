import React from "react";
import { Form, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { _getTipoMenu } from "../../../../services/controllers/tipoMenu";

export const NewMenu = ({ setShowMenuType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await (_getTipoMenu, data);
      setShowMenuType(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label>Menu</label>
          <input
            className="form-control"
            placeholder="Tipo Menu"
            {...register("username", {
              required: { value: true, message: "El menu es requerido" },
            })}
          />
          <small className="form-text text-danger">
            {errors.nombre_producto && errors.nombre_producto.message}
          </small>
        </div>
        <div className="form-group mb-3">
          <label>Precio</label>
          <input
            className="form-control"
            placeholder="Precio Unitario"
            {...register("precio_unitario", {
              required: { value: true, message: "El precio es requerido" },
            })}
          />
          <small className="form-text text-danger">
            {errors.nombre_producto && errors.nombre_producto.message}
          </small>
        </div>
        <Button color="success" type="submit">
          Guardar
        </Button>
      </Form>
    </>
  );
};
