
// ProductService.java
package com.ccsd.biddingSystem.ProductSeller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add a new product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    public Product updateProduct(String productId, Product product) {
        Optional<Product> existingProduct = productRepository.findById(productId);
        if (existingProduct.isPresent()) {
            Product updatedProduct = existingProduct.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setStartingBid(product.getStartingBid());
            updatedProduct.setCurrentBid(product.getCurrentBid());
            updatedProduct.setSellerId(product.getSellerId());
            return productRepository.save(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with id " + productId);
        }
    }

    // View all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // View products by seller ID
    public List<Product> getProductsBySeller(String sellerId) {
        return productRepository.findAllBySellerId(sellerId);
    }

    // Get a specific product by its ID
    public Optional<Product> getProductById(String productId) {
        return productRepository.findById(productId);
    }
}

