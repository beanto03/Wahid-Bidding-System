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
        System.out.println("Registering user with role: " + register.getRole());  // Log role for debugging
        
        if (register.getRole() == 0) {
            if (buyerRepository.findByEmail(register.getEmail()) == null) {
                Buyer buyer = new Buyer();
                buyer.setEmail(register.getEmail());
                buyer.setPassword(register.getPassword());
                buyer.setName(register.getName());
                buyer.setRole(register.getRole());  // Ensure role is set
                buyerRepository.save(buyer);
                return true;
            }
        } else if (register.getRole() == 1) {
            if (sellerRepository.findByEmail(register.getEmail()) == null) {
                Seller seller = new Seller();
                seller.setEmail(register.getEmail());
                seller.setPassword(register.getPassword());
                seller.setName(register.getName());
                seller.setRole(register.getRole());  // Ensure role is set
                sellerRepository.save(seller);
                return true;
            }
        }
        return false;
    }
}
