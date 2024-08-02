package com.example.loan_calculator.DTO;

import lombok.Getter;
import lombok.Setter;

import java.text.DecimalFormat;
import java.time.LocalDate;

@Getter
@Setter
public class LoanResponse {
    private LocalDate date;
    private double loanValue;
    private double balance;
    private String consolidated;
    private double total;
    private double amortization;
    private double principalBalance;
    private double provision;
    private double accumulatedInterest;
    private double paid;

    public LoanResponse(LocalDate date, double loanValue, double balance, String consolidated, double total,
                        double amortization, double principalBalance, double provision, double accumulatedInterest, double paid) {
        this.date = date;
        this.loanValue = loanValue;
        this.balance = balance;
        this.consolidated = consolidated;
        this.total = total;
        this.amortization = amortization;
        this.principalBalance = principalBalance;
        this.provision = provision;
        this.accumulatedInterest = accumulatedInterest;
        this.paid = paid;
    }
}
