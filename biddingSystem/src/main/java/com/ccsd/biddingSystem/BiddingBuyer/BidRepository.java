package com.ccsd.biddingSystem.BiddingBuyer;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BidRepository extends MongoRepository<Bid, String> {
    List<Bid> findAllByProductId(String productId); // Make sure this is present
}
