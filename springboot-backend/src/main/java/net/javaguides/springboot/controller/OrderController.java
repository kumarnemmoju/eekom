package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Order;
import net.javaguides.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public String placeOrder(@RequestBody Order order) {
        orderService.placeOrder(order);
        return "Order placed Successfully!";
    }

    @GetMapping
    public List<Order> getOrdersByEmailId(@RequestParam String emailId) {
        return orderService.getOrdersByEmailId(emailId);
    }
}
