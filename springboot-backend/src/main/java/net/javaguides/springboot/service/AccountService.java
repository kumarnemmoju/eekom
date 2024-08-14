package net.javaguides.springboot.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountService {

    public Map<String, Object> getAccountDetails() {
        Map<String, Object> response = new HashMap<>();

        response.put("your_lists", List.of(
                "create a wishlist",
                "wish from any website",
                "baby wishlist",
                "discover your style",
                "explore showroom"
        ));

        response.put("your_account", List.of(
                "your account",
                "your orders",
                "your wishlist",
                "your recommendations",
                "your prime membership",
                "your prime video",
                "your subscribe and save items",
                "memberships and subscriptions",
                "your seller account",
                "manage your content and devices",
                "your free amazon business account"
        ));

        return response;
    }
}

