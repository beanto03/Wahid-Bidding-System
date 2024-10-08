package com.ccsd.biddingSystem.Seller;

// import com.ccsd.biddingSystem.Buyer.Buyer;
// import com.ccsd.biddingSystem.Buyer.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    //Method for logging in
    public Seller login(String email, String password) {
        // Look up the seller by email
        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null && BCrypt.checkpw(password, seller.getPassword())) {
            return seller;  // Successful login
        }
        return null;  // Login failed
    }

    // New method for registering a buyer
    public boolean registerSeller(Seller seller) {
        // Check if the email already exists
        if (sellerRepository.findByEmail(seller.getEmail()) == null) {
            // Hash the password before saving
            String hashedPassword = BCrypt.hashpw(seller.getPassword(), BCrypt.gensalt());
            seller.setPassword(hashedPassword);
            sellerRepository.save(seller);
            return true; // Registration successful
        }
        return false; // Registration failed due to existing email
    }
}
