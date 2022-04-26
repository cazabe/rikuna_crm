import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { _getIncome, _updateIncome } from '../../../services/controllers/income';
import pay from '../../../Assets/pay.png';
import './income.css';

const Income = () => {
    const [Income, setIncome] = useState([]);

    const getIncome = async () => {
        try {
            const resp = await _getIncome();
            if (resp.status === 200) {
                setIncome(resp.data.data);
            } else {
                alert('Erro en el servidor');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateIncome = async (id) => {
        try {
            const resp = await _updateIncome(id)
            if (resp) {
                alert('La acción se registro de manera correcta');
                window.location.reload();
                return;
            }
        } catch (error) {
            alert('Erro al registrar la acción, intente de nuevo por favor');
        }
    }

    useEffect(() => {
        getIncome()
    }, [])
    // console.log("Llegaron las ordenes", orders);
    return (
        <div>
            <h1>Tabla de ordenes</h1>
            <Container>
                {Income.length > 0 ?
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre cliente</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Income.map((incomeData) => {
                                return (
                                    <tr key={incomeData.id_ingreso}>
                                        <td>{incomeData.id_ingreso}</td>
                                        <td>{incomeData.nombre_cliente}</td>
                                        <td>${incomeData.total}</td>
                                        <td>{incomeData.estado === 'P' ? 'Pendiente' : 'Acreditado'}</td>
                                        <td><img className='tableImg' src={pay} alt='delivery' onClick={() => handleUpdateIncome(incomeData.id_ingreso)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    : <div className='text-center mt-4'><h2>No hay datos </h2></div>}

            </Container>
        </div>
    )
}

export default Income;