package com.ccsd.biddingSystem.Buyer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "buyers")

public class Buyer {
    @Id
    private String buyerId;
    private String name;
    private String email;
    private String password;
    private String phoneNum;
    private int role;  // "0=buyer" or "1=seller"

    // Getters and Setters
    public String getBuyerId(){
        return buyerId;
    }

    public void setBuyerId(String id){
        this.buyerId = buyerId;
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
