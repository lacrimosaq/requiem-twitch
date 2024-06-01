package com.example.requiemrestservice.repository;

import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.model.Stream;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StreamRepository extends JpaRepository<Stream, Integer> {
    public Stream findByUserId(Integer user_id);
}
