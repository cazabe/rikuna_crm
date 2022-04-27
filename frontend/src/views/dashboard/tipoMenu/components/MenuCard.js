import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { EditMenu } from "./EditMenu";

const MenuCard = ({ data }) => {
  const [registerId, setRegisterId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleEdit = () => setShowEdit(true);
  const handleEditClose = () => setShowEdit(false);

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
              setRegisterId(data.menu_id);
              handleEdit();
            }}
          >
            Editar
          </Button>
          <Button variant="danger btn-sm">Borrar</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default MenuCard;
