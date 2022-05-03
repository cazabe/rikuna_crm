import { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Container, Form } from "react-bootstrap";
import {
  _getOneTipoMenu,
  _updateTipoMenu,
} from "../../../../services/controllers/tipoMenu";

export const EditMenu = ({ id, close }) => {
  const [menuTipe, setMenuTipe] = useState('');
  const [menuPrecio, setMenuPrecio] = useState('');

  const getOneMenu = useCallback(async () => {
    try {
      const data = await _getOneTipoMenu(id);
      setMenuTipe(data.menu)
      setMenuPrecio(data.precio_unitario)
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await _updateTipoMenu(id, menuTipe, menuPrecio);
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
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Menu</Form.Label>
            <Form.Control
              value={menuTipe}
              onChange={(e) => setMenuTipe(e.target.value)}
              type="menu"
              placeholder="Nombre del Menu"
            //   defaultValue={oneMenu.menu}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              value={menuPrecio}
              onChange={(e) => setMenuPrecio(e.target.value)}
              type="precio"
              placeholder="Precio del Menu"
            //   defaultValue={oneMenu.precio_unitario}
            >
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
