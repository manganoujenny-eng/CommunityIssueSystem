/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.community.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

/**
 *
 * @author HP
 */
@Entity
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String type;
    
    @OneToMany(mappedBy = "user")
    private List<User> users;
    
   public Organization(){
       
   }
   public Organization(String name , String type){
       this.name = name;
       this.type = type;
   }
   public Long GetId(){
       return id;
   }
   public List<User> GetUsers(){
       return users;
   }
   public String GetName(){
       return name;
   }
   public String GetType(){
       return type;
   }
   public void SETUsers(List<User> users){
       this.users = users;
   }
   public void SetName(String name){
       this.name = name;
   }
   public void SetType(String type){
       this.type = type;
   }
}
