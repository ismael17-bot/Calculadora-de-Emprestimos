package com.example.loan_calculator.controller;

import com.example.loan_calculator.DTO.LoanRequest;
import com.example.loan_calculator.DTO.LoanResponse;
import com.example.loan_calculator.service.LoanCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/calculate")
public class LoanCalculatorController {

    @Autowired
    private LoanCalculatorService loanCalculatorService;

    @PostMapping
    public List<LoanResponse> calculateLoan(@RequestBody LoanRequest loanRequest) {
        return loanCalculatorService.calculateLoan(loanRequest);
    }
}
