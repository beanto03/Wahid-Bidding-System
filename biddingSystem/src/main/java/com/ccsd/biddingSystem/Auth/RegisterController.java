package com.ccsd.biddingSystem.Auth;

// import com.ccsd.biddingSystem.Auth.Register;
// import com.ccsd.biddingSystem.Auth.RegisterService; // Update to your actual service package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody Register register) {
        boolean isRegistered = registerService.register(register);

        if (isRegistered) {
            return ResponseEntity.ok(register.getRole() + " registered successfully!");
        } else {
            return ResponseEntity.status(400).body("Registration failed. Email might already exist.");
        }
    }
}
