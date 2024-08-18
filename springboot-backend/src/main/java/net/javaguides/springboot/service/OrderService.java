package net.javaguides.springboot.service;

import net.javaguides.springboot.model.Order;
import net.javaguides.springboot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByEmailId(String emailId) {
        return orderRepository.findByEmailId(emailId);
    }
}
