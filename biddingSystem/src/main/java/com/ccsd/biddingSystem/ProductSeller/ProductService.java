package com.ccsd.biddingSystem.ProductSeller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    public Product addProductWithImages(Product product, MultipartFile[] images) throws IOException {
        try {
            // Convert images to Base64 strings
            List<String> imageBase64Strings = convertImagesToBase64(images);
            product.setImageBase64Strings(imageBase64Strings); // Assuming you have a list for Base64 strings
            // Save the product with its images
            return productRepository.save(product);
        } catch (Exception e) {
            logger.error("Error saving product with images", e);
            throw new RuntimeException("Failed to save product", e);
        }
    }

    public List<Product> getAllProducts() {
        // Fetch all products from the database
        return productRepository.findAll();
    }

    public List<Product> getProductsBySeller(String sellerId) {
        // Retrieve products by the seller's ID
        return productRepository.findBySellerId(sellerId);
    }

    public Optional<Product> getProductById(String productId) {
        // Find a product by its ID
        return productRepository.findById(productId);
    }

    public Product updateProduct(String productId, Product updatedProduct, MultipartFile imageFile) {
        // Retrieve the existing product from the database
        Optional<Product> existingProductOpt = productRepository.findById(productId);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            
            // Update the existing product fields
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setStartingBid(updatedProduct.getStartingBid());
            existingProduct.setSellerId(updatedProduct.getSellerId());

            // Handle image update if a new image file is provided
            if (imageFile != null && !imageFile.isEmpty()) {
                // Convert the image to Base64 or handle it as needed
                String imageBase64 = convertImageToBase64(imageFile); // Use the new method
                existingProduct.setImageBase64Strings(Arrays.asList(imageBase64)); // Assuming you want to store it as a single image in a list
            }

            // Save the updated product back to the database
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    public void deleteProduct(String productId) {
        // Delete the product by ID
        productRepository.deleteById(productId);
    }

    private List<String> convertImagesToBase64(MultipartFile[] images) throws IOException {
        // Convert each image to a Base64 string
        return Arrays.stream(images)
                .map(this::convertImageToBase64) // Use the new method for each image
                .collect(Collectors.toList());
    }

    // New method to convert a single MultipartFile to Base64
    private String convertImageToBase64(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            return Base64.getEncoder().encodeToString(bytes);
        } catch (IOException e) {
            logger.error("Error converting image to Base64", e);
            throw new RuntimeException("Failed to convert image to Base64", e);
        }
    }
}
