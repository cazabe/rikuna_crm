/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from "@testing-library/react";
import Clientorder from '../views/publicLanding/ClientOrder';
import MenuClient from '../views/Misc/MenuCards';
window.alert = jest.fn();

const dataTest = {
    tipo_menu: {
        menu: 'Menu normal'
    },
    proteina: 'Carne con pollo'
}

test('Must render menu content', () => {
    const view = render(<Clientorder />)
    view.getByText('MENU RIKUNA');
});

//with this type of test we can pass props to a component and test it also as if the component is making an api call and recieve data.
//because this component reciebe props we must pass data in a json format for the test to work
//the beforeEach said taht everytime a test is run first it has to execute what is in the beforeEach
describe('<MenuCards/>', () => {
    let component
    beforeEach(() => {
        component = render(
            <MenuClient data={dataTest} />
        )
    })

    test('render data on row', () => {
        component.getByText('Menu normal')
    })
})

test('Must show order form to users, so they can generate an order', () => {
    const view = render(<Clientorder />)
    view.getByText('Nombre y apellido:');
    view.getByText('Cantidad de almuerzos');
});

//with the fire event we simulate that the user make a click on the button to make an action
//We use the mocj handler to represent a function that is been called, in this case would be creating an order

test('Must execute order controller when button on form is clicked', () => {
    const view = render(<Clientorder />)
    const button = view.getByText('Realizar pedido');
    fireEvent.submit(button);
});