package com.ccsd.biddingSystem.Bidding;

import java.util.Comparator; // Import HistoryService
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccsd.biddingSystem.History.HistoryService;
import com.ccsd.biddingSystem.ProductSeller.Product; // For List
import com.ccsd.biddingSystem.ProductSeller.ProductRepository; // For Comparator

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HistoryService historyService; // Inject HistoryService

    public String placeBid(String productId, String buyerId, double bidAmount) {
        // Find the product by ID
        Optional<Product> productOpt = productRepository.findById(productId);
        if (!productOpt.isPresent()) {
            return "Product not found";
        }

        Product product = productOpt.get();

        // Check if the bid is higher than the current highest bid
        if (bidAmount <= product.getCurrentBid()) {
            return "Your bid must be higher than the current bid.";
        }

        // Update the current bid for the product
        product.setCurrentBid(bidAmount);
        productRepository.save(product);

        // Save the bid details
        Bid bid = new Bid();
        bid.setProductId(productId);
        bid.setBuyerId(buyerId);
        bid.setAmount(bidAmount);
        bidRepository.save(bid);

        // Save the winning bid in history
        historyService.saveHistory(buyerId, productId, bidAmount); // Save to history

        return "Bid placed successfully!";
    }

    public void checkWinningBid(String productId, String buyerId) {
        List<Bid> bids = bidRepository.findAllByProductId(productId);
        if (bids.isEmpty()) {
            System.out.println("No bids placed for product: " + productId);
            return;
        }

        // Find the highest bid
        Bid winningBid = bids.stream()
            .max(Comparator.comparingDouble(Bid::getAmount))
            .orElse(null);

        if (winningBid != null && winningBid.getBuyerId().equals(buyerId)) {
            System.out.println("Congratulations! You have won the bid for product: " + productId);
        } else {
            System.out.println("The highest bid for product " + productId + " was placed by user: " + winningBid.getBuyerId());
        }
    }
}
