package com.ccsd.biddingSystem.BidHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bidHistory")
public class BidHistoryController {

    @Autowired
    private BidHistoryService bidHistoryService;

    // New endpoint to get all bids for a specific buyer and product
    @GetMapping("/getBids/{buyerId}/{productId}")
    public ResponseEntity<List<BidHistory>> getBidsByBuyerAndProduct(
            @PathVariable String buyerId,
            @PathVariable String productId) {
        List<BidHistory> bids = bidHistoryService.getBidsByBuyerAndProduct(buyerId, productId);
        if (bids.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(bids);
        }
    }
}
