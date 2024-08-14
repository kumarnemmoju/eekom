package net.javaguides.springboot.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mobiles")
public class Mobile {

    @Id
    private long mobileId;
    private String name;
    private String series;
    private int year;
    private String ram;
    private String storage;
    private double price;
    private double originalPrice;
    private int discount;
    private int rating;
    private int reviews;
    private String imageUrl;
	public long getMobileId() {
		return mobileId;
	}
	public void setMobileId(long mobileId) {
		this.mobileId = mobileId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSeries() {
		return series;
	}
	public void setSeries(String series) {
		this.series = series;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public String getRam() {
		return ram;
	}
	public void setRam(String ram) {
		this.ram = ram;
	}
	public String getStorage() {
		return storage;
	}
	public void setStorage(String storage) {
		this.storage = storage;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getOriginalPrice() {
		return originalPrice;
	}
	public void setOriginalPrice(double originalPrice) {
		this.originalPrice = originalPrice;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public int getReviews() {
		return reviews;
	}
	public void setReviews(int reviews) {
		this.reviews = reviews;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

    
}

