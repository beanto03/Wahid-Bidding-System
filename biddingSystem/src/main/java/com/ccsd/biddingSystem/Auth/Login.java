package com.ccsd.biddingSystem.Auth;

import com.ccsd.biddingSystem.Buyer.Buyer;
import com.ccsd.biddingSystem.Buyer.BuyerService;
import com.ccsd.biddingSystem.Seller.Seller;
import com.ccsd.biddingSystem.Seller.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class Login {
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private BuyerService buyerService;

    @Autowired
    private SellerService sellerService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, @RequestParam int role) {
        if (role == 0) {
            // If role = 0, it's a buyer
            Buyer buyer = buyerService.login(email, password);
            if (buyer != null) {
                // Redirect to buyer dashboard
                return ResponseEntity.ok("Redirecting to buyer dashboard...");
            } else {
                return ResponseEntity.status(401).body("Invalid email or password for buyer.");
            }
        } else if (role == 1) {
            // If role = 1, it's a seller
            Seller seller = sellerService.login(email, password);
            if (seller != null) {
                // Redirect to seller dashboard
                return ResponseEntity.ok("Redirecting to seller dashboard...");
            } else {
                return ResponseEntity.status(401).body("Invalid email or password for seller.");
            }
        }
        return ResponseEntity.status(400).body("Invalid role specified.");
    }
}
}
