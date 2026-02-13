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

/**
 *
 * @author HP
 */
@Entity
public class Issue {
    
    public enum Status{
        OPEN,
        IN_PROGRESS,
        RESOLVED,
        CLOSE
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Title;
    private String Description;
    private Status status;
    private String OrganizationName;
    private Long UserId;
    @ManyToOne
    @JoinColumn(name= "user_id") //foreign key in Issue table
    private User user;
    public Issue(){}
    public Issue(String title , String desc , Status status ,Long UserId,String orgName){
        this.Title = title;
        this.Description = desc;
        this.status = status;
        this.UserId = UserId;
        this.OrganizationName = orgName;
    }
    public Long GetId(){
        return id;
    }
    public Long GetUserId(){
        return UserId;
    }
    public String GetOrgName(){
        return OrganizationName;
    }
    public String GetTitle(){
        return Title;
    }
    public String GetDescription(){
        return Description;
    }
    public Status GetStatus(){
        return status;
    }
     public void SetUserId(Long UserId){
        this.UserId = UserId;
    }
     public void SetOrgName(String orgName){
        this.OrganizationName = orgName;
    }
    public void SetTitle(String title){
        this.Title = title;
    }
    public void SetDescription(String desc){
        this.Description = desc;
    }
    public void  SetStatus(Status status){
        this.status = status;
    }
    public User GetUser(){
        return user;
    }
    public void SetUser(User user){
        this.user = user;
    }
    
}
