import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { _gettOrder, _updateOrder } from '../../../services/controllers/order';
import delivery from '../../../Assets/delivery.png';
import confDelivery from '../../../Assets/take-away.png';
import './orders.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async (action) => {
    try {
      const resp = await _gettOrder(action);
      if (resp.status === 200) {
        setOrders(resp.data.data);
      } else {
        alert('Erro en el servidor');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateDelivery = async (id, action) => {
    try {
      const resp = await _updateOrder(id, action)
      if (resp) {
        alert('La acción se registro de manera correcta');
        window.location.reload();
        return;
      }
    } catch (error) {
      alert('Erro al registrar la acción, intente de nuevo por favor');
      return;
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  // console.log("Llegaron las ordenes", orders);
  return (
    <div>
      <h1>Tabla de ordenes</h1>
      <Row className='mb-4 mt-3'>
        <Col>
          <Button onClick={() => getOrders()}>Todos</Button>
          <Button onClick={() => getOrders('pendiente')} style={{ marginLeft: '10px' }}>Pendientes</Button>
          <Button onClick={() => getOrders('enEntrega')} style={{ marginLeft: '10px' }}>En entrega</Button>
          <Button onClick={() => getOrders('entregado')} style={{ marginLeft: '10px' }}>Entregados</Button>
        </Col>
      </Row>
      <Container>
        {orders.length > 0 ?
          <Table striped bordered hover className='text-center'>
            <thead>
              <tr>
                <th>Nombre cliente</th>
                <th>Menu</th>
                <th>Cantidad</th>
                <th>Comentario</th>
                <th>Total de la orden</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>

              {orders.map((order) => {
                return (
                  <tr key={order.orden_id}>
                    <td>{order.nombre_cliente}</td>
                    <td>{order.tipo_menu.menu}</td>
                    <td>{order.cantidad}</td>
                    <td>{order.comentario ? order.comentario : "-"}</td>
                    <td>${order.total}</td>
                    <td>{order.hora_entrega ? "Entregado" : order.hora_salida ? "En entrega" : "Pendiente"}</td>
                    <td><img className='tableImg' src={delivery} alt='delivery' onClick={() => handleUpdateDelivery(order.orden_id, 'salida')} /> <img className='tableImg' src={confDelivery} alt='confirm delivery' onClick={() => handleUpdateDelivery(order.orden_id, 'entrega')} /> </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          : <div className='text-center mt-4'><h2>No hay ordenes activas</h2></div>
        }

      </Container>
    </div>
  )
}

export default Order;
