package com.ccsd.biddingSystem.Buyer;

public class Buyer {
    private String id;
    private String name;
    private String email;
    private String password;
    private String phoneNum;
    // private int role;  // "0=buyer" or "1=seller"

    // Getters and Setters
    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
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

   
}
