import React, { useState, useEffect, useCallback } from "react";
import MenuCards from "../Misc/MenuCards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { _getMenu } from '../../services/controllers/menu';


const Clientorder = () => {
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
            <h1 className="text-center mt-4">MENU RIKUNA</h1>
            <Container>
                <Row>
                    {menuData.length > 0 ?
                        menuData.map((menu) => {
                            return (
                                <Col key={menu.id_menu}><MenuCards data={menu} /></Col>
                            )
                        })
                        :
                        <h1>No hay menus registrados</h1>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Clientorder;