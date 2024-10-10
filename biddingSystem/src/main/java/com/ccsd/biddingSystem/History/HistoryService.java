package com.ccsd.biddingSystem.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    public List<History> getUserHistory(String userId) {
        return historyRepository.findByUserId(userId);
    }

    // Method to save a history record (you can call this when a bid is won)
    public void saveHistory(String userId, String productId, double bidAmount) {
        History history = new History(userId, productId, bidAmount);
        historyRepository.save(history);
    }
}
