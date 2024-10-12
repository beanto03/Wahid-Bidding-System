package com.ccsd.biddingSystem.Bidding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    // Endpoint to place a bid
    @PostMapping("/placeBid")
    public ResponseEntity<String> placeBid(@RequestParam String productId, @RequestParam String buyerId, @RequestParam double bidAmount) {
        // Debugging log for received request
        System.out.println("Received bid request: " + "productId=" + productId + ", buyerId=" + buyerId + ", bidAmount=" + bidAmount);
        
        // Call the BidService to handle bid placement
        String response = bidService.placeBid(productId, buyerId, bidAmount);
        return ResponseEntity.ok(response);
    }

    /*//New endpoint to check if b idding ended and trigger popup notifications
    @GetMapping("/checkBidEnd")
    public ResponseEntity<String> checkBidEnd(@RequestParam String productId){
        String response = bidService.checkBidEnd(productId);
        return ResponseEntity.ok(response);

    }*/
}
