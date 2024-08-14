package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.service.AccountService;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/account-details")
    public Map<String, Object> getAccountDetails() {
        return accountService.getAccountDetails();
    }
}

