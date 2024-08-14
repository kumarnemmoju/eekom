package net.javaguides.springboot.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/{userId}/cart")
    public ResponseEntity<String> addMobileToCart(@PathVariable int userId, @RequestParam long mobileId) {
        String result = userService.addMobileToCart(userId, mobileId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{userId}/cart")
    public ResponseEntity<String> removeMobileFromCart(@PathVariable int userId, @RequestParam long mobileId) {
        String result = userService.removeMobileFromCart(userId, mobileId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String message = userService.registerUser(user);
        return ResponseEntity.ok(new ResponseMessage(message));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        String message = userService.loginUser(user);
        return ResponseEntity.ok(new ResponseMessage(message));
    }

    public static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
