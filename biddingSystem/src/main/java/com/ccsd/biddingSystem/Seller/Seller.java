package com.ccsd.biddingSystem.Seller;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sellers")
public class Seller {
    @Id
    private String sellerId;
    private String name;
    private String email;
    private String password;
    private String phoneNum;
    private int role;  // "0=buyer" or "1=seller"

    // Getters and Setters
    public String getSellerId(){
        return sellerId;
    }

    public void setSellerId(String sellerId){
        this.sellerId = sellerId;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPhoneNum(){
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum){
        this.phoneNum = phoneNum;
    }

    public int getRole(){
        return role;
    }

    public void setRole(int role){
        this.role = role;
    }
   
}
