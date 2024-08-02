package com.example.loan_calculator.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LoanRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate firstPaymentDate;
    private double loanAmount;
    private double interestRate;
}
