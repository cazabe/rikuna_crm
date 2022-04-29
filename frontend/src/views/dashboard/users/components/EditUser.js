import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { api } from "../../../../services/network";
import headers from "../../../../services/headers";
import { _createUser } from "../../../../services/controllers/user";
import { _getRol } from "../../../../services/controllers/user";

export const EditUser = ({ id }) => {
  const [data, setData] = useState({ person: {} });

  const getUsers = useCallback(async () => {
    try {
      const resp = await api.get(`/user/${id}`, { headers: headers() });
      if (resp.status === 200) {
        setData(() => ({
          person: resp.data.data,
        }));
      } else {
        alert("No se encuentra");
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const [rolInfo, setRolInfo] = useState([]);
  const [userName, setUserName] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPasword] = useState("");
  const [rolUser, setUserRol] = useState();
  // const [users, setUsers] = useState({ person: {} });
  // // const [value, setValue] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await _createUser(userName, password, correo, rolUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getRol = useCallback(async () => {
    try {
      const data = await _getRol();
      setRolInfo(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
    getRol();
  }, [getRol, getUsers]);
  // const getUsers = async () => {
  //   try {
  //     const resp = await _getUser();
  //     if (resp.status === 200) {
  //       setUsers(() => ({
  //         person: resp.data.data,
  //       }));
  //     } else {
  //       alert("No se econtro");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getRol();
  //   getUsers();
  // }, [getRol]);

  // // setValue("nombre", users.data.username ? users.data.username : "");
  return (
    <>
      <Container>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="nombre"
              placeholder="Ingrese usuario"
              defaultValue={data.person.username}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese password"
              onChange={(e) => setPasword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              placeholder="Ingrese Email"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seleccione un Rol</Form.Label>
            <Form.Select onChange={(e) => setUserRol(e.target.value)}>
              <option>Elige un rol</option>
              {rolInfo.map((item) => {
                return (
                  <option key={item.rol_id} value={item.rol_id}>
                    {item.rol}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Container>
    </>
  );
};
