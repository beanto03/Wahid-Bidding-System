package com.ccsd.biddingSystem.History;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HistoryRepository extends MongoRepository<History, String> {
    List<History> findByUserId(String userId); // Method to find history by user ID
}
