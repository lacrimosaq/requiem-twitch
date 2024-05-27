package com.example.requiemrestservice.service;

import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.repository.FollowRepository;
import com.example.requiemrestservice.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowService {
    @Autowired
    private FollowRepository followRepository;


    public Iterable<Follow> getAll() {
        return followRepository.findAll();
    }

    public Follow save(Follow follow) {
        return followRepository.save(follow);
    }

    public void delete(Integer id) {
        followRepository.deleteById(id);
    }

    public Optional<Follow> getById(Integer id) { return followRepository.findById(id); }
}
