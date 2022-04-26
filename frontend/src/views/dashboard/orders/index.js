import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { _gettOrder, _updateOrder } from '../../../services/controllers/order';
import delivery from '../../../Assets/delivery.png';
import confDelivery from '../../../Assets/take-away.png';
import './orders.css';

const Order = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const resp = await _gettOrder();
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
            <Container>
                {orders.length > 0 ?
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
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
                                        <td>{order.orden_id}</td>
                                        <td>{order.nombre_cliente}</td>
                                        <td>{order.tipo_menu.menu}</td>
                                        <td>{order.cantidad}</td>
                                        <td>{order.comentario ? order.comentario : "-"}</td>
                                        <td>${order.total}</td>
                                        <td>{order.hora_entrega ? "Entregado" : order.hora_salida ? "En proceso" : "-"}</td>
                                        <td><img className='tableImg' src={delivery} alt='delivery' onClick={() => handleUpdateDelivery(order.orden_id, 'salida')} /> <img className='tableImg' src={confDelivery} alt='confirm delivery' /> </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    : <div className='text-center mt-4'><h2>No hay ordenes activas</h2></div>}

            </Container>
        </div>
    )
}

export default Order;