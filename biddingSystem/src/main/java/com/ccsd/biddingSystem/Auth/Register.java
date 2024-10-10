package com.ccsd.biddingSystem.Auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class Register {
    @Id
    private String name;
    private String email; 
    private String password;
    private int role;

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

    public int getRole(){
        return role;
    }

    public void setRole(){
        this.role = role;
    }
}
