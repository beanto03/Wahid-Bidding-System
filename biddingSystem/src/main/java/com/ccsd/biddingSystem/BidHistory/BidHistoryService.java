//BidHistoryService.java

package com.ccsd.biddingSystem.BidHistory;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidHistoryService {

    @Autowired
    private BidHistoryRepository bidHistoryRepository;

    // Save or update highest bid
    public void saveBidHistory(String productId, String buyerId, double highestAmount) {
        Optional<BidHistory> existingBidHistory = bidHistoryRepository.findByProductId(productId);
        
        if (existingBidHistory.isPresent()) {
            // Update the existing highest bid if the new bid is higher
            BidHistory bidHistory = existingBidHistory.get();
            bidHistory.setBuyerId(buyerId);
            bidHistory.setHighestAmount(highestAmount);
            bidHistoryRepository.save(bidHistory);
        } else {
            // Create a new entry if no highest bid exists for the product
            BidHistory newBidHistory = new BidHistory();
            newBidHistory.setProductId(productId);
            newBidHistory.setBuyerId(buyerId);
            newBidHistory.setHighestAmount(highestAmount);
            bidHistoryRepository.save(newBidHistory);
        }
    }

    /*// Retrieve highest bid for a product
    public Optional<BidHistory> getBidHistory(String productId) {
        return bidHistoryRepository.findByProductId(productId);
    }*/

    // Retrieve all bids by buyerId and productId
    public List<BidHistory> getBidsByBuyerAndProduct(String buyerId, String productId) {
        return bidHistoryRepository.findByBuyerIdAndProductId(buyerId, productId);
    }
    
}
