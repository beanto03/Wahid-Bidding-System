package com.ccsd.biddingSystem.Seller;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SellerRepository extends MongoRepository<Seller, String> {
    Seller findByEmail(String email);  // Method to find a buyer by email
}
