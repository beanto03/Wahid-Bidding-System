package com.ccsd.biddingSystem.Bidding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    // Endpoint to place a bid
    @PostMapping("/placeBid")
    public ResponseEntity<String> placeBid(@RequestBody Bid bid) {
        // Debugging log for received request
        System.out.println("Received bid: productId=" + bid.getProductId() +
                           ", buyerId=" + bid.getBuyerId() + 
                           ", bidAmount=" + bid.getAmount());

        try {
            // Validate the bid amount
            if (bid.getAmount() <= 0) {
                return ResponseEntity.badRequest().body("Bid amount must be greater than zero.");
            }

            // Call the BidService to handle bid placement
            String response = bidService.placeBid(bid.getProductId(), bid.getBuyerId(), bid.getAmount());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Enhanced error logging
            System.err.println("Error placing bid: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error placing your bid: " + e.getMessage());
        }
    }

    /*// Endpoint to get all products for bidding
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProductsForBidding() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }*/

    /*//New endpoint to check if b idding ended and trigger popup notifications
    @GetMapping("/checkBidEnd")
    public ResponseEntity<String> checkBidEnd(@RequestParam String productId){
        String response = bidService.checkBidEnd(productId);
        return ResponseEntity.ok(response);

    }*/
}
