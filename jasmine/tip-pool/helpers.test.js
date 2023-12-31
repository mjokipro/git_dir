describe('Utilities test', () => {
    beforeEach(() => {
        billAmtInput.value = 40;
        tipAmtInput.value = 5;
        submitPaymentInfo();
    });

    it('should sum total tip', () => {
        expect(sumPaymentTotal('tipAmt')).toEqual(8);

    });

    it('should append td', () => {
        let newTr = document.createElement('tr');

        appendTd(newTr, 'test');

        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('test');

    });

    it('generate delete tr', () => {
        let newTr = document.createElement('tr');

        appendDeleteBtn(newTr);

        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('X');
    });

    afterEach(() => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.value = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        allPayments = {};
        paymentId = 0;

    });
});