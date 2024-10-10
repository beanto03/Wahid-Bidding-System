package com.ccsd.biddingSystem.Seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    //Method for logging in
    public Seller login(String email, String password) {
        // Look up the seller by email
        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null && seller.getPassword().equals(password)) {
            return seller;  // Successful login
        }
        return null;  // Login failed
    }

    // New method for registering a buyer
    public boolean registerSeller(Seller seller) {
        // Check if the email already exists
        if (sellerRepository.findByEmail(seller.getEmail()) == null) {
            // Hash the password before saving
            seller.setPassword(seller.getPassword());
            sellerRepository.save(seller);
            return true; // Registration successful
        }
        return false; // Registration failed due to existing email
    }
}
