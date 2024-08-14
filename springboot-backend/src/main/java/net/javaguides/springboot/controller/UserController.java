package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.model.Address;
import net.javaguides.springboot.model.Mobile;
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

    @PutMapping("/{userId}/cart")
    public ResponseEntity<String> updateMobileInCart(@PathVariable int userId, @RequestParam long mobileId, @RequestBody Mobile mobileDetails) {
        String result = userService.updateMobileInCart(userId, mobileId, mobileDetails);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{userId}/wishlist")
    public ResponseEntity<String> addMobileToWishlist(@PathVariable int userId, @RequestParam long mobileId) {
        String result = userService.addMobileToWishlist(userId, mobileId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{userId}/wishlist")
    public ResponseEntity<String> removeMobileFromWishlist(@PathVariable int userId, @RequestParam long mobileId) {
        String result = userService.removeMobileFromWishlist(userId, mobileId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}/wishlist")
    public ResponseEntity<String> updateMobileInWishlist(@PathVariable int userId, @RequestParam long mobileId, @RequestBody Mobile mobileDetails) {
        String result = userService.updateMobileInWishlist(userId, mobileId, mobileDetails);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<String> addAddress(@PathVariable int userId, @RequestBody Address address) {
        String result = userService.addAddress(userId, address);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{userId}/addresses")
    public ResponseEntity<String> removeAddress(@PathVariable int userId, @RequestParam int addressId) {
        String result = userService.removeAddress(userId, addressId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}/addresses")
    public ResponseEntity<String> updateAddress(@PathVariable int userId, @RequestParam int addressId, @RequestBody Address addressDetails) {
        String result = userService.updateAddress(userId, addressId, addressDetails);
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
