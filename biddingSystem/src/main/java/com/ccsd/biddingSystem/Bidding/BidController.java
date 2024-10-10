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
    System.out.println("Received bid request: " + "productId=" + productId + ", buyerId=" + buyerId + ", bidAmount=" + bidAmount);
    String response = bidService.placeBid(productId, buyerId, bidAmount);
    return ResponseEntity.ok(response);
}

//akan ada part fetch data for history (nanti tengok balik) check dekat chatgpt

}
