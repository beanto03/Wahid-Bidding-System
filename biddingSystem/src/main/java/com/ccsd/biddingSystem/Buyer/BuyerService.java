package com.ccsd.biddingSystem.Buyer;

// import com.ccsd.biddingSystem.Buyer.Buyer;
// import com.ccsd.biddingSystem.Buyer.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    //Method for logging in
    public Buyer login(String email, String password) {
        // Look up the buyer by email
        Buyer buyer = buyerRepository.findByEmail(email);
        if (buyer != null && BCrypt.checkpw(password, buyer.getPassword())) {
            return buyer;  // Successful login
        }
        return null;  // Login failed
    }

    // New method for registering a buyer
    public boolean registerBuyer(Buyer buyer) {
        // Check if the email already exists
        if (buyerRepository.findByEmail(buyer.getEmail()) == null) {
            // Hash the password before saving
            String hashedPassword = BCrypt.hashpw(buyer.getPassword(), BCrypt.gensalt());
            buyer.setPassword(hashedPassword);
            buyerRepository.save(buyer);
            return true; // Registration successful
        }
        return false; // Registration failed due to existing email
    }
}
