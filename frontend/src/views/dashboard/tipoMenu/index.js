import React, { useCallback, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlusSquare } from "react-feather";
import { Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap";
import { TableMenuType } from "./components/TableMenuType";
import { _getTipoMenu } from "../../../services/controllers/tipoMenu";
import { NewMenu } from "./components/NewMenu";

const TipoMenu = () => {
  const [menuType, setMenuType] = useState([]);
  const [showMenuType, setShowMenuType] = useState(false);
  const toggle = () => setShowMenuType(!showMenuType);

  const getMenuType = useCallback(async () => {
    try {
      const data = await _getTipoMenu();
      setMenuType(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMenuType();
  }, [getMenuType]);
  return (
    <>
      <Modal isOpen={showMenuType} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ingresar Menu</ModalHeader>
        <ModalBody>
          <NewMenu setModalRegister={setShowMenuType} />
        </ModalBody>
      </Modal>
      <div
        className="mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Tipo Menu</h1>
        <div>
          <Button color="info" onClick={() => setShowMenuType(true)}>
            <PlusSquare />
          </Button>
        </div>
      </div>
      <Row>
        {/* {menuType.length > 0 ? (
          menuType.map((item) => {
            return <TableMenuType data={item} />;
          })
        ) : (
          <h1>No Hay Tipos de Menus</h1>
        )} */}
        <TableMenuType data={menuType} />
      </Row>
    </>
  );
};

export default TipoMenu;
