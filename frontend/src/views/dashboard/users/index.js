import React, { useCallback, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlusSquare } from "react-feather";
import { Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap";
import { TableRegisterUser } from "./components/TableRegisterUser";
import { _getUser } from "../../../services/controllers/user";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [modalRegister, setModalRegister] = useState(false);
  const toogle = () => setModalRegister(!modalRegister);

  const getUsers = useCallback(async () => {
    try {
      const data = await _getUser();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(userData);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <Modal>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
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
        {userData.length > 0 ? (
          userData.map((item) => {
            return <TableRegisterUser data={item} />;
          })
        ) : (
          <h1>No hay Usuarios registrados</h1>
        )}
      </Row>
    </>
  );
};

export default Users;
