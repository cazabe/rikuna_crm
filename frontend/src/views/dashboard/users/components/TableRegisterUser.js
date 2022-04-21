import { PlusSquare, Edit, Trash2 } from "react-feather";
import { Table } from "reactstrap";

export const TableRegisterUser = ({ data }) => {
  return (
    <>
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
          {/* {data.map((data) => (
            
          ))} */}
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
              <PlusSquare />
              <Edit />
              <Trash2 />
            </td>
          </tr>
        </tbody>
        <div>{data.username}</div>
      </Table>
    </>
  );
};
