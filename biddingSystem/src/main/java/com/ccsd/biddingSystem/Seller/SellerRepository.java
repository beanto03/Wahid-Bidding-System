package com.ccsd.biddingSystem.Seller;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends MongoRepository<Seller, String> {
    Seller findByEmail(String email);
}
