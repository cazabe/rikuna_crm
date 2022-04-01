const { getFullDateWithTime } = require('../../utils/dates');
describe('Function should return the actual date and time', () => {
    test('return the date and time as a string with the correct format', () => {
        const dateWithTime = getFullDateWithTime();
        expect(dateWithTime).toMatch(new RegExp('[0-9]{4}-([1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'))
    });
})