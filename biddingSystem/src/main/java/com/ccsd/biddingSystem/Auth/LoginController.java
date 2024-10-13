package com.ccsd.biddingSystem.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> login(@RequestBody Login loginRequest) {
        System.out.println("Login attempt received for email: " + loginRequest.getEmail());
    
        Map<String, Object> response = loginService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (response != null) {
            System.out.println("Login successful for email: " + loginRequest.getEmail());
            return ResponseEntity.ok(response);
        }
        System.out.println("Login failed for email: " + loginRequest.getEmail());
        return ResponseEntity.status(401).body("Invalid email or password.");
}

}
