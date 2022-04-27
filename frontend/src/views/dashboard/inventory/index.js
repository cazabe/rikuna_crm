import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { _getInv } from "../../../services/controllers/inventory";

const Inventory = () => {
  const [inv, setInv] = useState([]);

  const getInventory = async () => {
    try {
      const resp = await _getInv();
      if (resp.status === 200) {
        setInv(resp.data.data);
      } else {
        alert("No se econtro");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);
  return (
    <>
      <h1>Inventario</h1>
      <Button>Crear Producto</Button>
      <Container>
        {inv.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((item) => {
                return (
                  <tr key={item.id_inventario}>
                    <td>{item.producto}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.descripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div>
            <h2>No hay productos registrados</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default Inventory;
