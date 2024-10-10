package com.ccsd.biddingSystem.Seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerSeller(@RequestBody Seller seller) {
        boolean isRegistered = sellerService.registerSeller(seller);
        if (isRegistered) {
            return ResponseEntity.ok("Buyer registered successfully.");
        } else {
            return ResponseEntity.status(400).body("Registration failed. Email might already exist.");
        }
    }
    
    // Add other methods for login and other functionalities here
}
