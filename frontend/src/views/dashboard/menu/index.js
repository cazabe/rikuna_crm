import React, { useState, useEffect, useCallback } from "react";
import { _getMenu } from "../../../services/controllers/menu";
import MenuCards from "../../Misc/MenuCards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Menu = () => {
    const [menuData, setMenuData] = useState([]);

    const getMenuData = useCallback(async () => {
        try {
            const data = await _getMenu();
            setMenuData(data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        getMenuData();
    }, [getMenuData]);

    return (
        <div>
            <h1 className="text-center mt-4">MENUS</h1>
            <Container>
                <div className="mt-4">
                    <Row>
                        {menuData.length > 0 ?
                            menuData.map((menu) => {
                                return (
                                    <Col md='4' xs='12' key={menu.id_menu}><MenuCards data={menu} action={'dashboard'} /></Col>
                                )
                            })
                            :
                            <h1>No hay menus registrado</h1>
                        }
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Menu;