// BiddingRepository.java
package com.ccsd.biddingSystem.BiddingSeller;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BiddingRepository extends MongoRepository<Bidding, String> {
    
    // Custom query method to find all bids for a specific product by its productId
    List<Bidding> findAllByProductId(String productId);
}
