package com.ccsd.biddingSystem.Buyer;

//import com.ccsd.biddingSystem.Buyer.Buyer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuyerRepository extends MongoRepository<Buyer, String> {
    Buyer findByEmail(String email);  // Method to find a buyer by email
}
