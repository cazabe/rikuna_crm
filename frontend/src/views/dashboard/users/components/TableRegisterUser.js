import { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { ModalBody } from "reactstrap";
import { ModalHeader } from "reactstrap";
import { Modal } from "reactstrap";
import { Table } from "reactstrap";
import { EditUser } from "./EditUser";

export const TableRegisterUser = ({ data }) => {
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => setShowEdit(!showEdit);

  const [registerId, setRegisterId] = useState(null);

  return (
    <>
      {/* Modal de Editar */}
      <Modal isOpen={showEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} style={{ color: "var(--blue)" }}>
          Editar Usuario
        </ModalHeader>
        <ModalBody>
          <EditUser id={registerId} setShowEdit={setShowEdit} />
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.user_id}>
              <td>{data.username}</td>
              <td>{data.correo}</td>
              <td>
                {data.estado === "A" && (
                  <label className="text-succes">Activo</label>
                )}
                {data.estado === "I" && (
                  <label className="text-warning">Inactivo</label>
                )}
              </td>
              <td>{data.rol_id}</td>
              <td>
                <Edit
                  style={{
                    marginRight: 8,
                    color: "#38b000",
                  }}
                  onClick={() => {
                    setShowEdit(true);
                    setRegisterId(data.user_id);
                  }}
                />
                <Trash2
                  style={{
                    color: "red",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};