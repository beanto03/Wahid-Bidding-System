package com.ccsd.biddingSystem.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<History>> getUserHistory(@PathVariable String userId) {
        List<History> history = historyService.getUserHistory(userId);
        return ResponseEntity.ok(history);
    }

    // You can add more endpoints as needed
}
