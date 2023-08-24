describe('testing for calculate function', () => {

    beforeEach(() => {
        width = 0;
        length = 0;
    });

    it('calculates wid * len', () => {
       expect(calculate(3, 3)).toBe(9);

    });

    afterEach(() => {
        width = 0;
        length = 0;

    })


});