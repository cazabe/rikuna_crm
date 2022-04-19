/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from "@testing-library/react";
import Clientorder from '../views/publicLanding/ClientOrder';
import MenuClient from '../views/Misc/MenuCards';

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

//with this type of test we can pass props to a component and test it also as if the component is making an api call and recieve data
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