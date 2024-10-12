package com.ccsd.biddingSystem.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody Register register) {
        boolean isRegistered = registerService.register(register);

        if (isRegistered) {
            return ResponseEntity.ok(register.getRole() + " mregistered successfully!");
        } else {
            return ResponseEntity.status(400).body("Registration failed. Email might already exist.");
        }
    }
}
