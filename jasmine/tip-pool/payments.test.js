describe('tests submitPaymentInfo()', () => {

    beforeEach(() => {
        billAmtInput.value = 40;
        tipAmtInput.value = 5;

    })

    it('should add curPayment obj to allPayments', () => {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1']).billAmt.toEqual('40');
        expect(allPayments['payment1']).tipAmt.toEqual('5');
        expect(allPayments['payment1']).tipPercent.toEqual('8');

    });

    it('should not add payment', () => {
        billAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should update payment on table', () => {
  
    let curPayment = createCurPayment();

        allPayments['payment1'] = curPayment;

        appendPaymentTable(curPayment);

        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
        
        expect(curTdList.length).toEqual(4);
        expect(curTdList[0]).toEqual('$40');
        expect(curTdList[1]).toEqual('$5');
        expect(curTdList[2]).toEqual('%8');
        expect(curTdList[3]).toEqual('x');
        
    });

    it('should create new payment', () => {
        let expected = {
            billAmt: '40',
            tipAmt: '5',
            tipPercent: '8',
        }

        expect(createCurPayment()).toEqual(expected);
    });

    afterEach(() => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
    });



});