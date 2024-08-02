import React from "react";

const LoanResult = ({schedule}) => {
    return (
        <div className='loan-table-container'>
            <div className="loan-table">
                <table>
                    <thead>
                        <tr>
                            <th>Data Competência</th>
                            <th>Valor de Empréstimo</th>
                            <th>Saldo Devedor</th>
                            <th>Consolidada</th>
                            <th>Total</th>
                            <th>Amortização</th>
                            <th>Saldo</th>
                            <th>Provisão</th>
                            <th>Juros Acumulado</th>
                            <th>Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.loanValue}</td>
                                <td>{item.balance}</td>
                                <td>{item.consolidated}</td>
                                <td>{item.total}</td>
                                <td>{item.principal}</td>
                                <td>{item.principalBalance}</td>
                                <td>{item.provision}</td>
                                <td>{item.accumulatedInterest}</td>
                                <td>{item.paid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </div>
    );
}

export default LoanResult;