import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { _createInv } from "../../../../services/controllers/inventory";

export const NewInv = ({ close }) => {
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await _createInv(producto, cantidad, descripcion);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              onChange={(e) => setProducto(e.target.value)}
              type="producto"
              placeholder="Ingrese producto"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              onChange={(e) => setCantidad(e.target.value)}
              type="cantidad"
              placeholder="Ingrese cantidad"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              onChange={(e) => setDescripcion(e.target.value)}
              type="cantidad"
              placeholder="Descripcion"
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={close}>
            Guardar
          </Button>
        </Form>
      </Container>
    </>
  );
};
