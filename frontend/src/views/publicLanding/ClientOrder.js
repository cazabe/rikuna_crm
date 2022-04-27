import React, { useState, useEffect, useCallback } from "react";
import MenuCards from "../Misc/MenuCards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { _getMenu, _getTipoMenu } from '../../services/controllers/menu';
import { _postOrder } from "../../services/controllers/order";


const Clientorder = () => {
    const [menuData, setMenuData] = useState([]);
    const [menuDataType, setMenuDataType] = useState([]);
    const [fullName, setFullName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [menuType, setMenuType] = useState('');
    const [coment, setComent] = useState('');

    const getMenuData = useCallback(async () => {
        try {
            const data = await _getMenu();
            setMenuData(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTipeMenuData = useCallback(async () => {
        try {
            const data = await _getTipoMenu();
            setMenuDataType(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !quantity || !menuType) {
            alert('Todos los datos con obligatorios');
            return;
        }
        try {
            const resp = await _postOrder(fullName, quantity, menuType, coment)
            if (resp) {
                alert('Pedido enviado cone exito');
                window.location.reload();
            } else {
                alert('error al enviar el pedido, por favor intente de nuevo');
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getMenuData();
        getTipeMenuData();
    }, [getMenuData, getTipeMenuData]);
    return (
        <div>
            <h1 className="text-center mt-4">MENU RIKUNA</h1>
            <Container>
                <div className="mt-4">
                    <Row>
                        {menuData.length > 0 ?
                            menuData.map((menu) => {
                                return (
                                    <Col md='4' xs='12' key={menu.id_menu}><MenuCards data={menu} /></Col>
                                )
                            })
                            :
                            <h1>No hay menus registrados</h1>
                        }
                    </Row>
                </div>
                <Row>
                    <Col md='6' xs='12'>
                        <div className="mt-5">
                            <Card>
                                <Card.Header><h2>Escoge tu menu</h2></Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Nombre y apellido:</Form.Label>
                                            <Form.Control type="nombre" placeholder="Ingrese su nombre y apellido" onChange={e => setFullName(e.target.value)} />
                                            <Form.Text className="text-muted">
                                                Si es empresa, puede solo poner el nombre de la empresa.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Cantidad de almuerzos</Form.Label>
                                            <Form.Control type="number" placeholder="Ingrese el número de almuerzos que desea" onChange={e => setQuantity(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Seleccione el tipo de menu que desea</Form.Label>
                                            <Form.Select onChange={e => setMenuType(e.target.value)}>
                                                <option>Seleccione...</option>
                                                {menuDataType.map((menu) => {
                                                    return (
                                                        <option key={menu.tipo_menu_id} value={menu.tipo_menu_id}>{menu.menu}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Comentario</Form.Label>
                                            <Form.Control type="text" placeholder="Si deseas dejar algun comentario para tu menu colocalo aquí" onChange={e => setComent(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Realizar pedido
                                        </Button>
                                    </Form>
                                </Card.Body>
                                <Card.Footer className="text-muted"></Card.Footer>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Clientorder;