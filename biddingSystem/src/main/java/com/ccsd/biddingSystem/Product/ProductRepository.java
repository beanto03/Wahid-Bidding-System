
// ProductRepository.java
package com.ccsd.biddingSystem.Product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {

    // Find all products by a specific seller ID
    List<Product> findAllBySellerId(String sellerId);
