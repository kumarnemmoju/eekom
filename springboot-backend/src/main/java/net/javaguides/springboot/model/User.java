package net.javaguides.springboot.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    private int id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @ElementCollection
    private List<String> itemsInCart;

    @ElementCollection
    private List<String> itemsInWishlist;

    @ElementCollection
    private List<String> addressesOfUser;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getItemsInCart() {
        return itemsInCart;
    }

    public void setItemsInCart(List<String> itemsInCart) {
        this.itemsInCart = itemsInCart;
    }

    public List<String> getItemsInWishlist() {
        return itemsInWishlist;
    }

    public void setItemsInWishlist(List<String> itemsInWishlist) {
        this.itemsInWishlist = itemsInWishlist;
    }

    public List<String> getAddressesOfUser() {
        return addressesOfUser;
    }

    public void setAddressesOfUser(List<String> addressesOfUser) {
        this.addressesOfUser = addressesOfUser;
    }
}
