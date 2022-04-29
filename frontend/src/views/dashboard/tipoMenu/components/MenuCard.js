import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { EditMenu } from "./EditMenu";
import headers from "../../../../services/headers";
import { api } from "../../../../services/network";

const MenuCard = ({ data }) => {
  const [registerId, setRegisterId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleEdit = () => setShowEdit(true);
  const handleEditClose = () => setShowEdit(false);
  const [showEraser, setShowEraser] = useState(false);
  const handleEraserClose = () => setShowEraser(false);
  const handleEraser = () => setShowEraser(true);

  const deleteMenu = async () => {
    try {
      const resp = await api.delete(`/tipo/menu/${registerId}`, {
        headers: headers(),
      });
      if (resp && resp.status !== 200) {
        return "Error";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMenu id={registerId} close={handleEditClose} />
        </Modal.Body>
      </Modal>

      {/* MOdal Eliminar */}
      <Modal show={showEraser} onHide={handleEraserClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar </Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea eliminar el Menu?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEraserClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteMenu();
              handleEraserClose();
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <Card.Header>
          <h3>{data.menu}</h3>
        </Card.Header>
        <Card.Body>
          <ul style={{ textAlign: "justify" }}>
            <li>
              <strong>Menu</strong> : {data.menu}
            </li>
            <li>
              <strong>Precio </strong>: {data.precio_unitario}
            </li>
          </ul>
          <Button
            variant="success btn-sm "
            onClick={() => {
              setRegisterId(data.tipo_menu_id);
              handleEdit();
            }}
          >
            Editar
          </Button>
          <Button
            variant="danger btn-sm"
            onClick={() => {
              setRegisterId(data.tipo_menu_id);
              handleEraser();
            }}
          >
            Borrar
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default MenuCard;
