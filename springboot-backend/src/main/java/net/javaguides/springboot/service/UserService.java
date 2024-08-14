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
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "User with this email already exists!";
        }
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
            } else {
                return "Invalid password!";
            }
        }
        return "No account found with this email!";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
