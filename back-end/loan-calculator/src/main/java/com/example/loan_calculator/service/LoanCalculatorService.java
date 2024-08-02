package com.example.loan_calculator.service;

import com.example.loan_calculator.DTO.LoanRequest;
import com.example.loan_calculator.DTO.LoanResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoanCalculatorService {
    private static final int DAYS_IN_YEAR = 360;
    private static final int TOTAL_INSTALLMENTS = 120;

    public List<LoanResponse> calculateLoan(LoanRequest loanRequest) {
        List<LoanResponse> schedules = new ArrayList<>();
        LocalDate paymentDate = loanRequest.getFirstPaymentDate();
        LocalDate startDate = loanRequest.getStartDate();

        double remainingBalance = loanRequest.getLoanAmount();
        double provision = 0.0;
        double accumulatedInterest = 0.0;
        double paid = 0.0;
        double balance = 0.0;
        double total = 0.0;
        double amortization = 0;

        YearMonth yearMonth = YearMonth.from(startDate);
        int ultimoDia = yearMonth.lengthOfMonth();
        LocalDate previousDate = startDate.withDayOfMonth(ultimoDia);

        int i = 0;

        do {
            if (i % 2 == 0) {
                long daysBetween = ChronoUnit.DAYS.between(startDate, previousDate) < 0 ? ChronoUnit.DAYS.between(startDate, previousDate)*-1:ChronoUnit.DAYS.between(startDate, previousDate);
                double interestFactor = Math.pow(1 + (loanRequest.getInterestRate()), (double) daysBetween / DAYS_IN_YEAR) - 1;
                yearMonth = YearMonth.from(startDate);
                ultimoDia = yearMonth.lengthOfMonth();
                previousDate = startDate.withDayOfMonth(ultimoDia);
                amortization = 0;
                remainingBalance = remainingBalance - amortization;
                provision = interestFactor * (remainingBalance + accumulatedInterest);
                paid = 0;
                accumulatedInterest += provision - paid;
                balance = remainingBalance + accumulatedInterest;

                schedules.add(new LoanResponse(previousDate, 0.0, balance, String.valueOf(0), 0, 0, remainingBalance, provision, accumulatedInterest, 0));
            } else {
                long daysBetween = ChronoUnit.DAYS.between(previousDate, paymentDate);
                double interestFactor = Math.pow(1 + (loanRequest.getInterestRate()), (double) daysBetween / DAYS_IN_YEAR) - 1;

                remainingBalance = remainingBalance - amortization;

                provision = interestFactor * (remainingBalance + 0);
                paid = accumulatedInterest + provision;
                accumulatedInterest = provision + accumulatedInterest - paid;
                balance = remainingBalance + accumulatedInterest;

                total = amortization + paid;
                startDate = paymentDate;

                String portion = ((i/2-i)*-1)+""+"/120";

                schedules.add(new LoanResponse(paymentDate, 0.0, balance, portion, total, amortization, remainingBalance, provision, accumulatedInterest, paid));

                paymentDate = paymentDate.plusMonths(1);
            }

            amortization = loanRequest.getLoanAmount() / TOTAL_INSTALLMENTS;
            i++;
        } while (i < (TOTAL_INSTALLMENTS*2));

        return schedules;
    }

}
