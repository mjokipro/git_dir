describe('test for calculateTaxes(income)', () => { 
    
    
    it('should calc high tax bracks', () => { 
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(1000)).toEqual(150);
        })
})

    
describe('test for getCurrentVals()', () => {

    it('should return obj w/ income = currentVal', () => {
        expect(getCurrentVals()).toBe(50000);
        })
})
