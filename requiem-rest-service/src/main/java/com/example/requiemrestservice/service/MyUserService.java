package com.example.requiemrestservice.service;


import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserService  implements UserDetailsService {
    @Autowired
    private MyUserRepository userRepository;


    public Iterable<MyUser> getAll() {
        return userRepository.findAll();
    }

    public MyUser save(MyUser myUser) {
        return userRepository.save(myUser);
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    public Optional<MyUser> getById(Integer id) { return userRepository.findById(id); }

    public MyUser getByUsername(String username) { return userRepository.findByUsername(username); }

    public MyUser getByEmail(String email) { return userRepository.findByEmail(email);  }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser user = userRepository.findByUsername(username);
        if(user != null){
            var springUser = User.withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();
            return springUser;
        }
        return null;
    }

}
