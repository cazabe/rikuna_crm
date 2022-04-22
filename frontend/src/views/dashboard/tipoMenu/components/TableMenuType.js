import { useState } from "react";
import { Edit } from "react-feather";
import { Trash2 } from "react-feather";
import { ModalBody } from "reactstrap";
import { ModalHeader } from "reactstrap";
import { Modal } from "reactstrap";
import { Table } from "reactstrap";

export const TableMenuType = ({ data }) => {
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => setShowEdit(!showEdit);

  //   const [registerId, setRegisterId] = useState(null);

  return (
    <>
      {/* Modal de Editar */}
      <Modal isOpen={showEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} style={{ color: "var(--blue)" }}>
          Editar Producto
        </ModalHeader>
        <ModalBody>
          {/* <EditUser id={registerId} setShowEdit={setShowEdit} /> */}
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>Menu</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.tipo_menu_id}>
              <td>{item.menu}</td>
              <td>{item.precio_unitario}</td>
              <td>
                {item.estado === "A" && (
                  <label className="text-succes">Activo</label>
                )}
                {item.estado === "I" && (
                  <label className="text-warning">Inactivo</label>
                )}
              </td>
              <td>
                <Edit
                  style={{
                    marginRight: 8,
                    color: "#38b000",
                  }}
                  onClick={() => {
                    "";
                    // setShowEdit(true);
                    // setRegisterId(data.user_id);
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
