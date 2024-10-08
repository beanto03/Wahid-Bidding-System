package com.ccsd.biddingSystem.Buyer;

//import com.ccsd.biddingSystem.Buyer.Buyer;
//import com.ccsd.biddingSystem.Buyer.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerBuyer(@RequestBody Buyer buyer) {
        boolean isRegistered = buyerService.registerBuyer(buyer);
        if (isRegistered) {
            return ResponseEntity.ok("Buyer registered successfully.");
        } else {
            return ResponseEntity.status(400).body("Registration failed. Email might already exist.");
        }
    }
    
    // Add other methods for login and other functionalities here
}
