package com.ccsd.biddingSystem.Auth;

import com.ccsd.biddingSystem.Buyer.Buyer;
import com.ccsd.biddingSystem.Buyer.BuyerRepository;
import com.ccsd.biddingSystem.Seller.Seller;
import com.ccsd.biddingSystem.Seller.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private SellerRepository sellerRepository;

    public Map<String, Object> login(String email, String password) {
        Buyer buyer = buyerRepository.findByEmail(email);
        if (buyer != null && buyer.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", 0);
            response.put("username", buyer.getName());
            return response;
        }

        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null && seller.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", 1);
            response.put("username", seller.getName());
            return response;
        }

        return null;
    }
}
