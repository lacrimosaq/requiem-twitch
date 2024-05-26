package com.example.requiemrestservice.repository;

import com.example.requiemrestservice.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyUserRepository extends JpaRepository<MyUser, Integer> {
    public MyUser findByUsername(String username);
    public MyUser findByEmail(String email);
}
