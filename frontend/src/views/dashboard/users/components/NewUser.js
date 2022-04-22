import React, { useCallback, useEffect, useState } from "react";
import { Form, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { _createUser } from "../../../../services/controllers/user";
import { _getRol } from "../../../../services/controllers/user";

export const NewUser = ({ setModalRegister }) => {
  //   const dataRol = _getRol;

  const [userRol, setUserRol] = useState([]);

  const getRol = useCallback(async () => {
    try {
      const data = await _getRol();
      setUserRol(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getRol();
  }, [getRol]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await _createUser(data);
      setModalRegister(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label>Nombre Usuario</label>
          <input
            className="form-control"
            placeholder="Usuario"
            {...register("username", {
              required: { value: true, message: "El nombre es requerido" },
            })}
          />
          <small className="form-text text-danger">
            {errors.nombre_producto && errors.nombre_producto.message}
          </small>
        </div>
        <div className="form-group mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            {...register("password", {
              required: { value: true, message: "Contraseña requerida" },
            })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            {...register("correo", {
              required: { value: true, message: "Correo requerida" },
            })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Rol</label>
          <select
            className="form-control"
            {...register("rol_id", {
              required: { value: true, message: "Rol requerida" },
            })}
          >
            <option value="">Seleccione Rol</option>
            {userRol.map((rol, index) => (
              <option value={`${rol.rol_id}`} key={rol.rol_id}>
                {rol.rol}
              </option>
            ))}
          </select>
        </div>
        <Button color="success" type="submit">
          Guardar
        </Button>
      </Form>
    </>
  );
};
