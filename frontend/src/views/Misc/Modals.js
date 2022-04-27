import React, { useState } from "react";
import { _createMenu } from "../../services/controllers/menu";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MenuModal = ({ tittle, menuId }) => {
    console.log("Id del menu ", menuId);
    const [proteina, setProteina] = useState('');
    const [sopa, setSopa] = useState('');
    const [carbohidrato, setCarbohidrato] = useState('');
    const [ensalada, setEnsalada] = useState('');
    const [postre, setPostre] = useState('');
    const [jugo, setJugo] = useState('');
    const id = menuId;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        console.log('entre aquii');
        console.log('id que s epasa a el controlador', id);
        const data = {
            proteina: proteina,
            sopa: sopa,
            carbohidrato: carbohidrato,
            ensalada: ensalada,
            postre: postre,
            jugo: jugo
        }
        try {
            const resp = await _createMenu(data, id);
            if (!resp) {
                alert('Error al crear el menu');
                return
            }
            alert('Se actualizo el menu de manera correcta');
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('Hubo un problema el enviar los datos, por favor intente de nuevo')
            return;
        }
    }

    return (
        <>
            <Button onClick={handleShow}> Crear menu</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{tittle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Proteina</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la proteina"
                                autoFocus
                                onChange={(e) => { setProteina(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Sopa</Form.Label>
                            <Form.Control type="text"
                                placeholder="ingrese la sopa"
                                onChange={(e) => { setSopa(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Carbohidrato</Form.Label>
                            <Form.Control type="text"
                                placeholder="ingrese el carbohidrato"
                                onChange={(e) => { setCarbohidrato(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Ensalada</Form.Label>
                            <Form.Control type="text"
                                placeholder="ingrese la ensalada"
                                onChange={(e) => { setEnsalada(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Postre</Form.Label>
                            <Form.Control type="text"
                                placeholder="ingrese el postre"
                                onChange={(e) => { setPostre(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Jugo</Form.Label>
                            <Form.Control type="text"
                                placeholder="ingrese el jugo"
                                onChange={(e) => { setJugo(e.target.value) }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MenuModal;