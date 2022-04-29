import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { _createMenu } from "../../../../services/controllers/tipoMenu";
import { Button } from "react-bootstrap";

export const NewMenu = ({ close }) => {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await _createMenu(menu, price);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Menu</Form.Label>
            <Form.Control
              onChange={(e) => setMenu(e.target.value)}
              type="menu"
              placeholder="Nombre del Menu"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              type="precio"
              placeholder="Precio del Menu"
            ></Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              window.location.reload();
              close();
            }}
          >
            Guardar
          </Button>
        </Form>
      </Container>
    </>
  );
};
