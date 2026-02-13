/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.community.backend.controller;

import com.community.backend.Issue;
import com.community.backend.IssueRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author HP
 */
@RestController
@RequestMapping("/issues")
public class IssueController {
    
    @Autowired
    private IssueRepository issueRepository;

    // GET all issues
    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    // GET issue by ID
    @GetMapping("/{id}")
    public Optional<Issue> getIssueById(@PathVariable Long id) {
        return issueRepository.findById(id);
    }

    // GET issues by status
    @GetMapping("/by-status/{status}")
    public List<Issue> getIssuesByStatus(@PathVariable Issue.Status status) {
        return issueRepository.FindByStatus(status);
    }

    // GET issues by user ID
    @GetMapping("/by-user/{userId}")
    public List<Issue> getIssuesByUser(@PathVariable Long userId) {
        return issueRepository.FindByUserId(userId);
    }

    // POST create a new issue
    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        return issueRepository.save(issue);
    }

    
}
