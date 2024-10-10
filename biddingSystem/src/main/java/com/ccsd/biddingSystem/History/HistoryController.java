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

    @GetMapping("/{buyerId}")
    public ResponseEntity<List<History>> getBuyerHistory(@PathVariable String buyerId) {
        List<History> history = historyService.getBuyerHistory(buyerId);
        return ResponseEntity.ok(history);
    }

}
