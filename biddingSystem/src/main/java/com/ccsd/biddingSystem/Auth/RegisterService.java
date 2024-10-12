package com.ccsd.biddingSystem.Auth;

import com.ccsd.biddingSystem.Buyer.Buyer;
import com.ccsd.biddingSystem.Buyer.BuyerRepository;
import com.ccsd.biddingSystem.Seller.Seller;
import com.ccsd.biddingSystem.Seller.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private SellerRepository sellerRepository;

    public boolean register(Register register) {
        System.out.println("Registering user with email: " + register.getEmail() + " and role: " + register.getRole());
        
        if (register.getRole() == 0) {  // Role for buyer
            Buyer existingBuyer = buyerRepository.findByEmail(register.getEmail());
            //System.out.println("Existing buyer: " + (existingBuyer != null ? existingBuyer.getEmail() : "null"));
            if (existingBuyer == null) {
                System.out.println("No existing buyer found, creating new buyer...");
                Buyer buyer = new Buyer();
                buyer.setEmail(register.getEmail());
                buyer.setPassword(register.getPassword());
                buyer.setName(register.getName());
                buyer.setRole(register.getRole());
                buyerRepository.save(buyer);  // Save the buyer
                return true;
            } else {
                System.out.println("Buyer already exists with email: " + register.getEmail());
            }
        } else if (register.getRole() == 1) {  // Role for seller
            Seller existingSeller = sellerRepository.findByEmail(register.getEmail());
            //System.out.println("Existing seller: " + (existingSeller != null ? existingSeller.getEmail() : "null"));
            if (existingSeller == null) {
                System.out.println("No existing seller found, creating new seller...");
                Seller seller = new Seller();
                seller.setEmail(register.getEmail());
                seller.setPassword(register.getPassword());
                seller.setName(register.getName());
                seller.setRole(register.getRole());
                sellerRepository.save(seller);  // Save the seller
                return true;
            } else {
                System.out.println("Seller already exists with email: " + register.getEmail());
            }
        }
        
        return false;  // If the email already exists or role is invalid
    }
}
