package com.example.requiemrestservice.dto;

import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.Stream;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

public class UserDto {
    private Integer id;
    
    private String username;
    
    private String email;
    
    //private String password;
    
    private String avatar;
    
    private String info;

    private String role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Boolean isLive;







    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getLive() {
        return isLive;
    }

    public void setLive(Boolean live) {
        isLive = live;
    }
}
