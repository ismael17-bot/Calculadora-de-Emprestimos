import React, { useState, useEffect } from 'react';
import LoanResult from './LoanResult';
import { NumericFormat } from 'react-number-format';
import { isEndDateGreaterThanStartDate, firstPaymentDateIsCorrect, calculateLoan } from '../services/util';

const LoanForm = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [firstPaymentDate, setFirstPaymentDate] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [schedule, setSchedule] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!startDate || !endDate || !firstPaymentDate || !loanAmount || !interestRate) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (!isEndDateGreaterThanStartDate(startDate, endDate)) {
            setErrorMessage('A data final deve ser maior que a data inicial.');
            return;
        }

        if (!firstPaymentDateIsCorrect(firstPaymentDate,startDate, endDate)) {
            setErrorMessage('A data de primeiro pagamento deve ser maior que a data inicial e menor que a data final.');
            return;
        }

        const loanDetails = {
            startDate,
            endDate,
            firstPaymentDate,
            loanAmount: parseFloat(loanAmount.replace(/\./g, '').replace(',', '.')),
            interestRate: parseFloat(interestRate.replace('%', '').replace(',', '.')) / 100
        };

        try {
            debugger;
            const result = await calculateLoan(loanDetails);
            setSchedule(result);
        } catch (error) {
            console.error('Erro ao calcular o cronograma do empréstimo:', error);
            setErrorMessage('Erro ao calcular o cronograma do empréstimo.');
        }
    };

    useEffect(() => {
        const isValid = startDate && endDate && firstPaymentDate && loanAmount && interestRate;
        setIsFormValid(isValid);
    }, [startDate, endDate, firstPaymentDate, loanAmount, interestRate]);

    return (
        <div className='App_container'>
            <div className='information-loan-form-container'>
                <form className='loan-form-group' onSubmit={handleSubmit}>
                    <div>
                        <label>Data Inicial:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Data Final:</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Primeiro Pagamento:</label>
                        <input type="date" value={firstPaymentDate} onChange={(e) => setFirstPaymentDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Valor do Empréstimo:</label>
                        <NumericFormat 
                            thousandSeparator="." 
                            decimalSeparator=","
                            decimalScale={3}
                            prefix="R$ " 
                            value={loanAmount} 
                            onValueChange={(values) => setLoanAmount(values.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Taxa de Juros (%):</label>
                        <NumericFormat 
                            suffix="%" 
                            decimalSeparator="," 
                            value={interestRate} 
                            onValueChange={(values) => setInterestRate(values.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" disabled={!isFormValid} >Calcular</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
            {schedule.length > 0 && <LoanResult schedule={schedule} />}
        </div>
    );
}

export default LoanForm;