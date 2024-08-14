package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.model.Mobile;
import net.javaguides.springboot.repository.MobileRepository;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class MobileService {

    @Autowired
    private MobileRepository mobileRepository;

    private Random random = new Random();

    public Mobile saveMobile(Mobile mobile) {
        mobile.setMobileId(generateRandomMobileId());
        return mobileRepository.save(mobile);
    }

    public List<Mobile> getAllMobiles() {
        return mobileRepository.findAll();
    }

    public Optional<Mobile> getMobileById(long mobileId) {
        return mobileRepository.findById(mobileId);
    }

    public Mobile updateMobile(long mobileId, Mobile mobileDetails) {
        Optional<Mobile> optionalMobile = mobileRepository.findById(mobileId);
        if (optionalMobile.isPresent()) {
            Mobile mobile = optionalMobile.get();
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
            return mobileRepository.save(mobile);
        }
        return null; // Handle properly in the controller
    }

    public void deleteMobile(long mobileId) {
        mobileRepository.deleteById(mobileId);
    }

    private long generateRandomMobileId() {
        return 10000000L + random.nextInt(90000000);
    }
}

