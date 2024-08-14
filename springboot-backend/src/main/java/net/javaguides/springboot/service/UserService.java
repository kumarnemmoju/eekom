package net.javaguides.springboot.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private Random random = new Random();

    public String registerUser(User user) {
        user.setId(random.nextInt(900) + 100); // Generate random 3 digit number
        userRepository.save(user);
        return "registered successfully";
    }

    public String loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return "login successfully";
            }
        }
        return "invalid credentials";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

