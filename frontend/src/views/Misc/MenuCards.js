import React from "react";
import Card from 'react-bootstrap/Card';
import MenuModal from "./Modals";

const MenuCards = ({ data, action }) => {
    return (
        <Card className="text-center">
            <Card.Header><h2>{data.tipo_menu.menu}</h2></Card.Header>
            <Card.Body>
                <ul style={{ textAlign: 'justify' }}>
                    <li><strong>Proteina</strong> : {data.proteina}</li>
                    <li><strong>Carbohidrato </strong>: {data.carbohidrato}</li>
                    <li><strong>Sopa </strong>: {data.sopa ? data.sopa : "N/A"}</li>
                    <li><strong>Ensalada</strong> : {data.ensalada}</li>
                    <li><strong>Jugo </strong>: {data.jugo}</li>
                    <li><strong>Postre</strong> : {data.postre}</li>
                </ul>
                {action === 'dashboard' ? <MenuModal tittle={data.tipo_menu.menu} menuId={data.id_menu} /> : null}
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    );
}

export default MenuCards;