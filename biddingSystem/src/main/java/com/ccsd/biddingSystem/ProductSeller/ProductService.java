package com.ccsd.biddingSystem.ProductSeller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; // Add this import

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
            List<String> imageBase64Strings = convertImagesToBase64(images);
            product.setImageBase64Strings(imageBase64Strings);
            return productRepository.save(product);
        } catch (Exception e) {
            logger.error("Error saving product with images", e);
            throw e;
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsBySeller(String sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public Optional<Product> getProductById(String productId) {
        return productRepository.findById(productId);
    }

    public Product updateProduct(String productId, Product productDetails, MultipartFile[] images) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setStartingBid(productDetails.getStartingBid());
            product.setCurrentBid(productDetails.getCurrentBid());
            product.setSellerId(productDetails.getSellerId());
            List<String> imageBase64Strings = convertImagesToBase64(images);
            product.setImageBase64Strings(imageBase64Strings);
            return productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    private List<String> convertImagesToBase64(MultipartFile[] images) throws IOException {
        return Arrays.stream(images)
                .map(image -> {
                    try {
                        return Base64.getEncoder().encodeToString(image.getBytes());
                    } catch (IOException e) {
                        logger.error("Error converting image to Base64", e);
                        throw new RuntimeException("Failed to convert image to Base64", e);
                    }
                })
                .collect(Collectors.toList());
    }
}
