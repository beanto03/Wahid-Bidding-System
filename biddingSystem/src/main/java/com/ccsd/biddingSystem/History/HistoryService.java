package com.ccsd.biddingSystem.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    public List<History> getBuyerHistory(String buyerId) {
        return historyRepository.findByBuyerId(buyerId);
    }

    // Method to save a history record (you can call this when a bid is won)
    public void saveHistory(String buyerId, String productId, double bidAmount) {
        History history = new History(buyerId, productId, bidAmount);
        historyRepository.save(history);
    }
}
