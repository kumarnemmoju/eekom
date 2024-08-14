package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.Mobile;
import net.javaguides.springboot.repository.MobileRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MobileService {

    @Autowired
    private MobileRepository mobileRepository;

    public Mobile saveMobile(Mobile mobile) {
        return mobileRepository.save(mobile);
    }

    public List<Mobile> getAllMobiles() {
        return mobileRepository.findAll();
    }

    public Optional<Mobile> getMobileById(long mobileId) {
        return mobileRepository.findById(mobileId);
    }

    public Mobile updateMobile(long mobileId, Mobile mobileDetails) {
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
            return mobileRepository.save(mobile);
        }
        return null;
    }

    public void deleteMobile(long mobileId) {
        mobileRepository.deleteById(mobileId);
    }
}
