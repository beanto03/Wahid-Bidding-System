// BiddingService.java
package com.ccsd.biddingSystem.BiddingSeller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BiddingService {

    @Autowired
    private BiddingRepository biddingRepository;

    // Fetch all bids for a specific product by productId
    public List<Bidding> getBidsByProductId(String productId) {
        return biddingRepository.findAllByProductId(productId);
    }

    // Retrieve the highest bid for a specific product
    public Optional<Bidding> getHighestBidForProduct(String productId) {
        List<Bidding> bids = biddingRepository.findAllByProductId(productId);
        
        return bids.stream()
                .max((bid1, bid2) -> Double.compare(bid1.getAmount(), bid2.getAmount()));
    }
}
