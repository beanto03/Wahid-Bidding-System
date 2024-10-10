package com.ccsd.biddingSystem.History;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "history")
public class History {
    @Id
    private String historyId;
    private String buyerId;
    private String productId;
    private double bidAmount;

    // Default constructor
    public History() {
    }

    // Constructor
    public History(String buyerId, String productId, double bidAmount) {
        this.buyerId = buyerId;
        this.productId = productId;
        this.bidAmount = bidAmount;
    }

    // Getters and Setters
    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }
}
