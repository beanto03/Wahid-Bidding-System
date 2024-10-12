package com.ccsd.biddingSystem.Buyer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends MongoRepository<Buyer, String> {
    Buyer findByEmail(String email);
}
