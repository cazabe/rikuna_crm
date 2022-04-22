import React, { useCallback, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlusSquare } from "react-feather";
import { Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap";
import { TableRegisterUser } from "./components/TableRegisterUser";
import { _getUser } from "../../../services/controllers/user";
import { NewUser } from "./components/NewUser";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [modalRegister, setModalRegister] = useState(false);
  const toggle = () => setModalRegister(!modalRegister);

  const getUsers = useCallback(async () => {
    try {
      const data = await _getUser();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <Modal isOpen={modalRegister} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ingresar Nuevo Usuario</ModalHeader>
        <ModalBody>
          <NewUser setModalRegister={setModalRegister} />
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
        <h1>Usuarios</h1>
        <div>
          <Button color="info" onClick={() => setModalRegister(true)}>
            <PlusSquare />
          </Button>
        </div>
      </div>
      <Row>
        {/* {userData.length > 0 ? (
          userData.map((item) => {
            return <TableRegisterUser data={item} />;
          })
        ) : (
          <h1>No hay Usuarios registrados</h1>
        )} */}
        <TableRegisterUser data={userData} />
      </Row>
    </>
  );
};

export default Users;
