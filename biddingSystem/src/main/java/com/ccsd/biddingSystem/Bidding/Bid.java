package com.ccsd.biddingSystem.Bidding;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bids")
public class Bid {

    @Id
    private String bidId;
    private String buyerId;
    private String productId;
    private double amount; //current amount of bid

    //constructor
    public Bid(){

    }
    
    // Getters and Setters
    public String getBidId() {
        return bidId;
    }

    public void setId(String bidId) {
        this.bidId = bidId;
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
