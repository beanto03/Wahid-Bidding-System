//BidHistoryRepository.java

package com.ccsd.biddingSystem.BidHistory;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface BidHistoryRepository extends MongoRepository<BidHistory, String> {
    
    Optional<BidHistory> findByProductId(String productId);
    
    // Add method to find bids by both buyerId and productId
    List<BidHistory> findByBuyerIdAndProductId(String buyerId, String productId);
}
