import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { _getInv } from "../../../services/controllers/inventory";
import { FaEdit, FaEraser } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import headers from "../../../services/headers";
import { api } from "../../../services/network";
import { NewInv } from "./components/NewInv";

const Inventory = () => {
  const [inv, setInv] = useState([]);
  const [registerId, setRegisterId] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEraser, setShowEraser] = useState(false);
  const handleEraserClose = () => setShowEraser(false);
  const handleEraser = () => setShowEraser(true);

  const getInventory = async () => {
    try {
      const resp = await _getInv();
      if (resp.status === 200) {
        setInv(resp.data.data);
      } else {
        alert("No se econtro");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInv = async () => {
    try {
      const resp = await api.delete(`/product/${registerId}`, {
        headers: headers(),
      });
      if (resp && resp.status !== 200) {
        return "Error";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInventory();
  }, []);
  return (
    <>
      {/* MOdal Insertar */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewInv close={handleClose} />
        </Modal.Body>
      </Modal>

      {/* MOdal Eliminar */}
      <Modal show={showEraser} onHide={handleEraserClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar </Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea eliminar el Producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEraserClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteInv();
              handleEraserClose();
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Inventario</h1>
      <Button onClick={handleShow}>Crear Producto</Button>
      <Container>
        {inv.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((item) => {
                return (
                  <tr key={item.id_inventario}>
                    <td>{item.producto}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.descripcion}</td>
                    <td>
                      <Button
                        className="btn btn-sm mr-3"
                        variant="outline-success"
                        onClick={() => {
                          // setRegisterId(item.user_id);
                          // handleShow();
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        className="btn btn-sm "
                        variant="outline-danger"
                        onClick={() => {
                          setRegisterId(item.id_inventario);
                          handleEraser();
                        }}
                      >
                        <FaEraser />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div>
            <h2>No hay productos registrados</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default Inventory;
