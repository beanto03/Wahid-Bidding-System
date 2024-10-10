package com.ccsd.biddingSystem.BiddingBuyer;

import com.ccsd.biddingSystem.Product.Product;
import com.ccsd.biddingSystem.Product.ProductRepository;
import com.ccsd.biddingSystem.History.HistoryService; // Import HistoryService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List; // For List
import java.util.Comparator; // For Comparator

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HistoryService historyService; // Inject HistoryService

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

        return "Bid placed successfully!";
    }

    // Method to finalize bidding, notify the winner, and inform other bidders
    public String finalizeBidding(String productId) {
        List<Bid> bids = bidRepository.findAllByProductId(productId);
        if (bids.isEmpty()) {
            return "No bids placed for product: " + productId;
        }

        // Find the highest bid (winner)
        Bid winningBid = bids.stream()
            .max(Comparator.comparingDouble(Bid::getAmount))
            .orElse(null);

        if (winningBid != null) {
            // Save the winning bid to history
            historyService.saveHistory(winningBid.getBuyerId(), productId, winningBid.getAmount());

            // Notify the winning buyer
            String winnerMessage = "Congratulations! Buyer " + winningBid.getBuyerId() + " has won the product: " + productId + " with a bid of " + winningBid.getAmount() + ".";
            System.out.println(winnerMessage);

            // Notify the non-winning buyers
            for (Bid bid : bids) {
                if (!bid.getBuyerId().equals(winningBid.getBuyerId())) {
                    String nonWinnerMessage = "Sorry, Buyer " + bid.getBuyerId() + ", you did not win the bid for product: " + productId + ". Your bid was: " + bid.getAmount() + ".";
                    System.out.println(nonWinnerMessage);
                }
            }

            return winnerMessage; // Return the winning message for the UI or Postman
        }

        return "No winning bid found.";
    }
}
