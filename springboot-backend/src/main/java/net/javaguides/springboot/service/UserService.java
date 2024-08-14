package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.model.Mobile;
import net.javaguides.springboot.model.Address;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.repository.MobileRepository;
import net.javaguides.springboot.repository.AddressRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MobileRepository mobileRepository;
    
    @Autowired
    private AddressRepository addressRepository;

    // Add a mobile to the user's cart
    public String addMobileToCart(int userId, long mobileId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                if (user.getItemsInCart().contains(mobile)) {
                    return "Mobile is already in the cart!";
                }
                user.getItemsInCart().add(mobile);
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

    // Update a mobile in the user's cart
    public String updateMobileInCart(int userId, long mobileId, Mobile mobileDetails) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                mobile.setName(mobileDetails.getName());
                mobile.setSeries(mobileDetails.getSeries());
                mobile.setYear(mobileDetails.getYear());
                mobile.setRam(mobileDetails.getRam());
                mobile.setStorage(mobileDetails.getStorage());
                mobile.setPrice(mobileDetails.getPrice());
                mobile.setOriginalPrice(mobileDetails.getOriginalPrice());
                mobile.setDiscount(mobileDetails.getDiscount());
                mobile.setRating(mobileDetails.getRating());
                mobile.setReviews(mobileDetails.getReviews());
                mobile.setImageUrl(mobileDetails.getImageUrl());
                userRepository.save(user);
                return "Mobile updated in cart successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Add a mobile to the user's wishlist
    public String addMobileToWishlist(int userId, long mobileId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                user.getItemsInWishlist().add(mobile);
                userRepository.save(user);
                return "Mobile added to wishlist successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Remove a mobile from the user's wishlist
    public String removeMobileFromWishlist(int userId, long mobileId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                user.getItemsInWishlist().remove(mobile);
                userRepository.save(user);
                return "Mobile removed from wishlist successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Update a mobile in the user's wishlist
    public String updateMobileInWishlist(int userId, long mobileId, Mobile mobileDetails) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Mobile> mobileOptional = mobileRepository.findById(mobileId);
            if (mobileOptional.isPresent()) {
                Mobile mobile = mobileOptional.get();
                mobile.setName(mobileDetails.getName());
                mobile.setSeries(mobileDetails.getSeries());
                mobile.setYear(mobileDetails.getYear());
                mobile.setRam(mobileDetails.getRam());
                mobile.setStorage(mobileDetails.getStorage());
                mobile.setPrice(mobileDetails.getPrice());
                mobile.setOriginalPrice(mobileDetails.getOriginalPrice());
                mobile.setDiscount(mobileDetails.getDiscount());
                mobile.setRating(mobileDetails.getRating());
                mobile.setReviews(mobileDetails.getReviews());
                mobile.setImageUrl(mobileDetails.getImageUrl());
                userRepository.save(user);
                return "Mobile updated in wishlist successfully!";
            } else {
                return "Mobile not found!";
            }
        }
        return "User not found!";
    }

    // Add an address to the user's addresses
    public String addAddress(int userId, Address address) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getAddresses().add(address);
            userRepository.save(user);
            return "Address added successfully!";
        }
        return "User not found!";
    }

    // Remove an address from the user's addresses
    public String removeAddress(int userId, int addressId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Address> addressOptional = addressRepository.findById(addressId);
            if (addressOptional.isPresent()) {
                Address address = addressOptional.get();
                user.getAddresses().remove(address);
                userRepository.save(user);
                return "Address removed successfully!";
            } else {
                return "Address not found!";
            }
        }
        return "User not found!";
    }

    // Update an address in the user's addresses
    public String updateAddress(int userId, int addressId, Address addressDetails) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Address> addressOptional = addressRepository.findById(addressId);
            if (addressOptional.isPresent()) {
                Address address = addressOptional.get();
                address.setStreet(addressDetails.getStreet());
                address.setCity(addressDetails.getCity());
                address.setState(addressDetails.getState());
                address.setPostalCode(addressDetails.getPostalCode());
                address.setCountry(addressDetails.getCountry());
                userRepository.save(user);
                return "Address updated successfully!";
            } else {
                return "Address not found!";
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

    // Log in a user
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
