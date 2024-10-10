// BiddingController.java
package com.ccsd.biddingSystem.BiddingSeller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bids")
public class BiddingController {

    @Autowired
    private BiddingService biddingService;

    // Endpoint to get all bids for a specific product
    @GetMapping("/product/{productId}")
    public List<Bidding> getBidsByProductId(@PathVariable String productId) {
        return biddingService.getBidsByProductId(productId);
    }

    // Endpoint to get the highest bid for a specific product
    @GetMapping("/product/{productId}/highest-bid")
    public Optional<Bidding> getHighestBid(@PathVariable String productId) {
        return biddingService.getHighestBidForProduct(productId);
    }
}
