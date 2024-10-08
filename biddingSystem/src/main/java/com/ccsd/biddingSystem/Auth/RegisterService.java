package com.ccsd.biddingSystem.Auth;

import com.ccsd.biddingSystem.Buyer.Buyer;
import com.ccsd.biddingSystem.Buyer.BuyerRepository;
import com.ccsd.biddingSystem.Seller.Seller;
import com.ccsd.biddingSystem.Seller.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private SellerRepository sellerRepository;

    public boolean register(Register register) {
        if (register.getRole() == 0) {
            // Check if buyer already exists
            if (buyerRepository.findByEmail(register.getEmail()) == null) {
                Buyer buyer = new Buyer();
                buyer.setEmail(register.getEmail());
                buyer.setPassword(BCrypt.hashpw(register.getPassword(), BCrypt.gensalt())); // Hash the password
                buyer.setName(register.getName());
                buyerRepository.save(buyer);
                return true;
            }
        } else if (register.getRole() == 1) {
            // Check if seller already exists
            if (sellerRepository.findByEmail(register.getEmail()) == null) {
                Seller seller = new Seller();
                seller.setEmail(register.getEmail());
                seller.setPassword(BCrypt.hashpw(register.getPassword(), BCrypt.gensalt())); // Hash the password
                seller.setName(register.getName());
                sellerRepository.save(seller);
                return true;
            }
        }
        return false;  // If the email already exists
    }
}
