/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.community.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

/**
 *
 * @author HP
 */

@Entity
public class User {
    
  public enum Role{
        ADMIN ,
        MEMBER
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    
    private Role role;
    
    @ManyToOne
    @JoinColumn(name= "organization_id") //foreign key in User table
    private Organization organization;
    
    @OneToMany(mappedBy = "user")
    private List<Issue> issues;
    
    public User(){
        
    }
    
    public User(String user, String password ,Role role){
        this.username = user;
        this.password = password;
        this.role = role;
    }
    
    public long GetId(){
        return id;
    }
    public String GetUsername(){
        return username;
    }
    public String GetPassword(){
        return password;
    }
    public Role getRole(){
        return role;
    }
    public List<Issue> GetIssue(){
        return issues;
    }
    public void SETIssues(List<Issue> issue){
        this.issues = issue;
    }
    public void SetUsername(String user){
        this.username = user ;
        }
    public void SetPassword(String pass){
        this.password = pass ; 
    }
    public void SetRole(Role role){
        this.role = role;
    }
    public Organization GetOrganization(){
        return organization;
    }
    public void SetOrganization(Organization org){
        this.organization = org;
        
    }
}
