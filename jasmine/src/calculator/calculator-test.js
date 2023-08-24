describe('test calculateMonthlyPayment(values)', () => {
 
  it('should calculate lower monthly rates correctly', function () {
    const initValues = {
      amount: 30000,
      years: 3,
      rate: 1.33,
    };
    expect(calculateMonthlyPayment(initValues)).toEqual('850.53');
  });
  
  
  
  
  
});

describe('test updateMonthly(monthly)', () => {
  
  it("should return a result with 2 decimal places", function() {
     const initValues = {
      amount: 40000,
      years: 4,
      rate: 1.33
    };
    expect(calculateMonthlyPayment(initValues)).toEqual('856.16');
  });

});