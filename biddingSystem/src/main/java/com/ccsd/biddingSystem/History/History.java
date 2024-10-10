package com.ccsd.biddingSystem.History;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "history")
public class History {
    @Id
    private String id;
    private String userId;
    private String productId;
    private double bidAmount;

    // Default constructor
    public History() {
    }

    // Constructor
    public History(String userId, String productId, double bidAmount) {
        this.userId = userId;
        this.productId = productId;
        this.bidAmount = bidAmount;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
