import { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Container, Form } from "react-bootstrap";
import {
  _getOneTipoMenu,
  _updateTipoMenu,
} from "../../../../services/controllers/tipoMenu";

export const EditMenu = ({ id, close }) => {
  const [menu, setMenu] = useState([]);
  const [oneMenu, setOneMenu] = useState({});

  const [precio, setPrice] = useState("");

  const getOneMenu = useCallback(async () => {
    try {
      const data = await _getOneTipoMenu(id);
      setOneMenu(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await _updateTipoMenu(id, menu, precio);
      if (resp) {
        alert("La acción se registro de manera correcta");
        window.location.reload();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneMenu();
  }, [getOneMenu]);

  return (
    <>
      <Container>
        {/* {oneMenu.map((oneMenu) => {
          return ( */}
        <Form onSubmit={submit} key={oneMenu.tipo_menu_id}>
          <Form.Group>
            <Form.Label>Menu</Form.Label>
            <input />
            <Form.Control
              onChange={(e) => setMenu(e.target.value)}
              type="menu"
              placeholder="Nombre del Menu"
              //   defaultValue={oneMenu.menu}
            >
              {oneMenu.menu}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              type="precio"
              placeholder="Precio del Menu"
              //   defaultValue={oneMenu.precio_unitario}
            >
              {oneMenu.precio_unitario}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={close}>
            Guardar
          </Button>
        </Form>
        {/* );
        })} */}
      </Container>
    </>
  );
};
