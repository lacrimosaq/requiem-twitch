package com.example.requiemrestservice.repository;

import com.example.requiemrestservice.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
}
