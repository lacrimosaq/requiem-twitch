package com.example.requiemrestservice.service;

import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.Stream;
import com.example.requiemrestservice.repository.FollowRepository;
import com.example.requiemrestservice.repository.StreamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StreamService {
    @Autowired
    private StreamRepository streamRepository;


    public Iterable<Stream> getAll() {
        return streamRepository.findAll();
    }

    public Stream save(Stream stream) {
        return streamRepository.save(stream);
    }

    public void delete(Integer id) {
        streamRepository.deleteById(id);
    }

    public Optional<Stream> getById(Integer id) { return streamRepository.findById(id); }

    public Stream getByUserId(Integer userId) { return streamRepository.findByUserId(userId); }


    public Stream updateById(Integer id, Stream updatedStream) {
        Stream existingStream = streamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Stream not found with id " + id));
        existingStream.setName(updatedStream.getName());
        existingStream.setThumbnail(updatedStream.getThumbnail());
        existingStream.setServerUrl(updatedStream.getServerUrl());
        existingStream.setIngressId(updatedStream.getIngressId());
        existingStream.setStreamKey(updatedStream.getStreamKey());
        existingStream.setLive(updatedStream.getLive());
        existingStream.setFollowerChat(updatedStream.getFollowerChat());
        existingStream.setChatDelay(updatedStream.getChatDelay());
        // Set other fields as necessary
        return streamRepository.save(existingStream);
    }
}
