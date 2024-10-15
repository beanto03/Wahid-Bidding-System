package com.ccsd.biddingSystem.Bidding;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BidRepository extends MongoRepository<Bid, String> {
    List<Bid> findAllByProductId(String productId);
}
