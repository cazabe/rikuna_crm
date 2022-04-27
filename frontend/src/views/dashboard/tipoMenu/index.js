import React, { useCallback, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { _getTipoMenu } from "../../../services/controllers/menu";
import MenuCard from "./components/MenuCard";
import { NewMenu } from "./components/NewMenu";

const TipoMenu = () => {
  const [tipo, setTipo] = useState([]);

  const [showRegister, setShowRegister] = useState(false);
  const handleOpenRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const getTipo = useCallback(async () => {
    try {
      const data = await _getTipoMenu();
      setTipo(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTipo();
  }, [getTipo]);

  return (
    <>
      {/* MOdal de insertar */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese el menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewMenu close={handleCloseRegister} />
        </Modal.Body>
      </Modal>

      <h1>Tipo de Menu</h1>
      <Button onClick={handleOpenRegister}>Crear Menu</Button>
      <Container>
        <div className="mt-4">
          <Row>
            {tipo.length > 0 ? (
              tipo.map((menu) => {
                return (
                  <Col md="4" xs="12" key={menu.tipo_menu_id}>
                    <MenuCard data={menu} />
                  </Col>
                );
              })
            ) : (
              <h1>No hay menus registrados</h1>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default TipoMenu;
