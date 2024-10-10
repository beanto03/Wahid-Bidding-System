package com.ccsd.biddingSystem.Auth;

import com.ccsd.biddingSystem.Buyer.Buyer;
import com.ccsd.biddingSystem.Buyer.BuyerService;
import com.ccsd.biddingSystem.Seller.Seller;
import com.ccsd.biddingSystem.Seller.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private BuyerService buyerService;

    @Autowired
    private SellerService sellerService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String email, @RequestParam String password, @RequestParam int role) {
        Map<String, String> response = new HashMap<>();
        if (role == 0) {
            // If role = 2, it's a buyer
            Buyer buyer = buyerService.login(email, password);
            if (buyer != null) {
                response.put("message", "Login successful");
                response.put("usertype", "0");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password for buyer."));
            }
        } else if (role == 1) {
            // If role = 1, it's a seller
            Seller seller = sellerService.login(email, password);
            if (seller != null) {
                response.put("message", "Login successful");
                response.put("usertype", "1");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password for seller."));
            }
        }
        return ResponseEntity.status(400).body(Map.of("message", "Invalid role specified."));
    }
}
