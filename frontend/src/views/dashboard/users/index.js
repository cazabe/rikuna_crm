import React, { useState, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { _getUser } from "../../../services/controllers/user";
import { NewUser } from "./components/NewUser";
import { EditUser } from "./components/EditUser";
import headers from "../../../services/headers";
import { api } from "../../../services/network";
import { FaEdit, FaEraser } from "react-icons/fa";

const Users = () => {
  const [registerId, setRegisterId] = useState(null);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEraser, setShowEraser] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegister = () => setShowRegister(true);
  const handleEraserClose = () => setShowEraser(false);
  const handleEraser = () => setShowEraser(true);

  const getUsers = async () => {
    try {
      const resp = await _getUser();
      if (resp.status === 200) {
        setUsers(resp.data.data);
      } else {
        alert("No se econtro");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const resp = await api.delete(`/user/${registerId}`, {
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
    getUsers();
  }, []);

  return (
    <>
      {/* Modal de Editar */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser id={registerId} />
        </Modal.Body>
      </Modal>

      {/* Modal de Insertar */}
      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese los datos del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewUser close={handleRegisterClose} />
        </Modal.Body>
      </Modal>

      {/* Modal de Eliminar */}
      <Modal show={showEraser} onHide={handleEraserClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar </Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea eliminar el Usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEraserClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser();
              handleEraserClose();
              window.location.reload();
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Usuarios</h1>
      <Button onClick={handleRegister} className="mb-3">
        Crear Usuario
      </Button>
      <Container>
        {users.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr key={item.user_id}>
                    <td>{item.username}</td>
                    <td>{item.correo}</td>
                    <td>
                      {item.rol_id === 1 && (
                        <label className="text-success">Admin</label>
                      )}
                      {item.rol_id === 2 && (
                        <label className="text-warning">Cajas</label>
                      )}
                    </td>
                    <td>
                      <Button
                        className="btn btn-sm mr-3"
                        variant="outline-success"
                        onClick={() => {
                          setRegisterId(item.user_id);
                          handleShow();
                          window.location.reload();
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        className="btn btn-sm "
                        variant="outline-danger"
                        onClick={() => {
                          setRegisterId(item.user_id);
                          handleEraser();
                          window.location.reload();
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
          <div className="text-center mt-4">
            <h2>No hay ordenes activas</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default Users;
