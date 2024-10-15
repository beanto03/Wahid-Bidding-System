package com.ccsd.biddingSystem.Bidding;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccsd.biddingSystem.BidHistory.BidHistoryService;
import com.ccsd.biddingSystem.ProductSeller.Product;
import com.ccsd.biddingSystem.ProductSeller.ProductRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BidHistoryService bidHistoryService; // Inject HistoryService

    // Method to place a bid
    public String placeBid(String productId, String buyerId, double bidAmount) {
        // Find the product by ID
        Optional<Product> productOpt = productRepository.findById(productId);
        if (!productOpt.isPresent()) {
            return "Product not found";
        }

        Product product = productOpt.get();

        // Check if the bid is higher than the current highest bid
        if (bidAmount <= product.getCurrentBid()) {
            return "Your bid must be higher than the current bid of " + product.getCurrentBid() + ".";
        }

        // Update the current bid for the product
        product.setCurrentBid(bidAmount);
        productRepository.save(product);

        // Save the bid details in the "bids" collection
        Bid bid = new Bid();
        bid.setProductId(productId);
        bid.setBuyerId(buyerId);
        bid.setAmount(bidAmount);
        bidRepository.save(bid);

        // Update the highest bid in the highest bid history collection
        bidHistoryService.saveBidHistory(productId, buyerId, bidAmount);

        return "Bid placed successfully!";
    }



    // Uncomment this if you want to keep the bidding end logic
    /* 
    public String checkBidEnd(String productId){
        Optional<Product> productOpt = productRepository.findById(productId);
        if (!productOpt.isPresent()){
            return "Product not found";
        }

        Product product = productOpt.get();

        // Check if bidding has ended (assuming endTime is stored in the product)
        long currentTime = System.currentTimeMillis();
        if (currentTime > product.getEndTime()) { // Assuming getEndTime() exists in Product

            // Find the highest bid
            Bid highestBid = bidRepository.findAllByProductId(productId)
                .stream()
                .max((b1, b2) -> Double.compare(b1.getAmount(), b2.getAmount()))
                .orElse(null);

            if (highestBid != null) {
                String winner = highestBid.getBuyerId();
                // Notify all buyers (this could be implemented with actual notifications or logs)
                return "Bidding ended! Winner: " + winner;
            }
            return "Bidding ended! No bids placed.";
        }

        return "Bidding is still ongoing.";
    }
    */
}
