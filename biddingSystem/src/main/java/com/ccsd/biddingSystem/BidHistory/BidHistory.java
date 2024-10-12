//BidHistory.java

package com.ccsd.biddingSystem.BidHistory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bid_history")  // Store highest bids in a separate collection
public class BidHistory {

    @Id
    private String historyId;
    private String productId;
    private String buyerId;
    private double highestAmount;

    // Constructor
    public BidHistory() {}

    // Getters and Setters
    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public double getHighestAmount() {
        return highestAmount;
    }

    public void setHighestAmount(double highestAmount) {
        this.highestAmount = highestAmount;
    }
}
