package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.model.Mobile;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.repository.MobileRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MobileRepository mobileRepository;

    // Add a mobile to the user's cart
    public String addMobileToCart(int userId, long mobileId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                user.getItemsInCart().add(mobile);  // Allow adding the mobile to any user
                userRepository.save(user);
                return "Mobile added to cart successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Remove a mobile from the user's cart
    public String removeMobileFromCart(int userId, long mobileId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                user.getItemsInCart().remove(mobile);
                userRepository.save(user);
                return "Mobile removed from cart successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Register a user
    public String registerUser(User user) {
        // Check if the user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "You already have an account with us. Please log in.";
        }
        // Save the new user
        userRepository.save(user);
        return "Registration successful";
    }

    public String loginUser(User user) {
        // Find the user by email
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElse(null);
        if (existingUser == null) {
            return "User does not exist. Please register.";
        }
        // Check if the password matches
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid credentials. Please check your password.";
        }
        return "Login successful";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
