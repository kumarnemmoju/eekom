package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.javaguides.springboot.model.Mobile;
import net.javaguides.springboot.service.MobileService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mobiles")
@CrossOrigin(origins = "http://localhost:4200")
public class MobileController {

    @Autowired
    private MobileService mobileService;

    @PostMapping
    public ResponseEntity<Mobile> createMobile(@RequestBody Mobile mobile) {
        Mobile createdMobile = mobileService.saveMobile(mobile);
        return ResponseEntity.ok(createdMobile);
    }

    @GetMapping
    public ResponseEntity<List<Mobile>> getAllMobiles() {
        return ResponseEntity.ok(mobileService.getAllMobiles());
    }

    @GetMapping("/{mobileId}")
    public ResponseEntity<Mobile> getMobileById(@PathVariable long mobileId) {
        Optional<Mobile> mobile = mobileService.getMobileById(mobileId);
        return mobile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{mobileId}")
    public ResponseEntity<Mobile> updateMobile(@PathVariable long mobileId, @RequestBody Mobile mobileDetails) {
        Mobile updatedMobile = mobileService.updateMobile(mobileId, mobileDetails);
        return ResponseEntity.ok(updatedMobile);
    }

    @DeleteMapping("/{mobileId}")
    public ResponseEntity<Void> deleteMobile(@PathVariable long mobileId) {
        mobileService.deleteMobile(mobileId);
        return ResponseEntity.noContent().build();
    }
}
