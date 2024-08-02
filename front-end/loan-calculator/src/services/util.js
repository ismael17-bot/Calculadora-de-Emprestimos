import axios from "axios";

const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
}

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

export const calculateLoan = async (loanDetails) => {
    try {
        debugger;
        const response = await axios.post('http://localhost:8080/calculate', loanDetails, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const formattedData = response.data.map(item => ({
            date: formatDate(item.date),
            loanValue: formatNumber(item.loanValue),
            balance: formatNumber(item.balance),
            consolidated: item.consolidated,
            total: formatNumber(item.total),
            amortization: formatNumber(item.amortization),
            principalBalance: formatNumber(item.principalBalance),
            provision: formatNumber(item.provision),
            accumulatedInterest: formatNumber(item.accumulatedInterest),
            paid: formatNumber(item.paid)
        }));
        return formattedData;
    } catch (err) {
        console.log(err);
        return err;
    }
};


export const isEndDateGreaterThanStartDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end > start;
};

export const firstPaymentDateIsCorrect = (firstPaymentDate, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const firstDate = new Date(firstPaymentDate);

    return firstDate > start && firstDate < end;
};