package com.example.requiemrestservice.controller;

import com.example.requiemrestservice.dto.UserDto;
import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.model.Stream;
import com.example.requiemrestservice.service.FollowService;
import com.example.requiemrestservice.service.MyUserService;
import com.example.requiemrestservice.service.StreamService;
import com.example.requiemrestservice.utils.Base64Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired // This means to get the bean called userRepository. Which is auto-generated by Spring, we will use it to handle the data
    private MyUserService myUserService;
    @Autowired
    private StreamService streamService;
    @Autowired
    private FollowService followService;

    @GetMapping(path="/profile/{username}")
    public @ResponseBody ResponseEntity<?> getProfile(@PathVariable String username) {
        MyUser myUser = myUserService.getByUsername(username);
        List<Stream> streams = (List<Stream>) streamService.getAll();

        UserDto userDto = new UserDto();
        userDto.setId(myUser.getId());
        userDto.setUsername(myUser.getUsername());
        userDto.setEmail(myUser.getEmail());
        userDto.setAvatar(Base64Helper.fileToBase64(myUser.getAvatar()));
        userDto.setInfo(myUser.getInfo());
        userDto.setRole(myUser.getRole());
        userDto.setCreatedAt(myUser.getCreatedAt());
        userDto.setUpdatedAt(myUser.getUpdatedAt());

        Optional<Stream> optional = streams.stream()
                .filter(s -> s.getUser().getId().equals(myUser.getId()))
                .findFirst();
        Stream stream = optional.orElse(null);
        userDto.setLive(stream.getLive());
        userDto.setViewersCount(stream.getViewersCount());


        List<Follow> allFollows = (List<Follow>) followService.getAll();
        List<Follow> filteredFollows = allFollows.stream()
                .filter(f -> f.getOwner().getId().equals(myUser.getId()))
                .toList();
        userDto.setFollowersCount(filteredFollows.size());
        if (myUser != null) {
            return ResponseEntity.ok(userDto);

        }
        return ResponseEntity.badRequest().body("Not such a user!");
    }


    @GetMapping(path="/recommended/{id}")
    public @ResponseBody ResponseEntity<?> getRecommended(@PathVariable Integer id) {
        boolean check = myUserService.getById(id).isPresent();
        if (check) {
            MyUser myUser = myUserService.getById(id).get();
            List<MyUser> users = (List<MyUser>) myUserService.getAll();
            List<Follow> allFollows = (List<Follow>) followService.getAll();

            List<Follow> filteredFollows = allFollows.stream()
                    .filter(f -> f.getFollower().getId().equals(myUser.getId()))
                    .toList();

            List<MyUser> usersResult = users.stream()
                    .filter(user -> filteredFollows.stream()
                    .noneMatch(follow -> follow.getOwner().getId().equals(user.getId())) && !user.getId().equals(myUser.getId()))
                    .sorted((u1, u2) -> u2.getCreatedAt().compareTo(u1.getCreatedAt()))
                    .toList();

            List<UserDto> result = new ArrayList<>();
            List<Stream> streams = (List<Stream>) streamService.getAll();
            for(MyUser user : usersResult){
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setUsername(user.getUsername());
                userDto.setEmail(user.getEmail());
                userDto.setAvatar(Base64Helper.fileToBase64(user.getAvatar()));
                userDto.setInfo(user.getInfo());
                userDto.setRole(user.getRole());
                userDto.setCreatedAt(user.getCreatedAt());
                userDto.setUpdatedAt(user.getUpdatedAt());
                Optional<Stream> optional = streams.stream()
                        .filter(s -> s.getUser().getId().equals(user.getId()))
                        .findFirst();
                Stream stream = optional.orElse(null);
                userDto.setLive(stream.getLive());
                userDto.setViewersCount(stream.getViewersCount());

                result.add(userDto);
            }
            return ResponseEntity.ok(result);

        }
        else{
            List<MyUser> allUsers = (List<MyUser>) myUserService.getAll();
            List<MyUser> usersResult = allUsers.subList(0, Math.min(allUsers.size(), 15));;
            List<UserDto> result = new ArrayList<>();
            List<Stream> streams = (List<Stream>) streamService.getAll();
            for(MyUser user : usersResult){
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setUsername(user.getUsername());
                userDto.setEmail(user.getEmail());
                userDto.setAvatar(Base64Helper.fileToBase64(user.getAvatar()));
                userDto.setInfo(user.getInfo());
                userDto.setRole(user.getRole());
                userDto.setCreatedAt(user.getCreatedAt());
                userDto.setUpdatedAt(user.getUpdatedAt());
                Optional<Stream> optional = streams.stream()
                        .filter(s -> s.getUser().getId().equals(user.getId()))
                        .findFirst();
                Stream stream = optional.orElse(null);
                userDto.setLive(stream.getLive());
                userDto.setViewersCount(stream.getViewersCount());

                result.add(userDto);
            }
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping(path="/search")
    public @ResponseBody ResponseEntity<?> getSearchUsers(@RequestParam String term){
        List<MyUser> allUsers = (List<MyUser>) myUserService.getAll();
        List<MyUser> filteredUsers = allUsers.stream()
                .filter(user -> user.getUsername().toLowerCase().contains(term.toLowerCase()))
                .limit(10)  // Limits the result to the first 10 elements
                .toList();

        List<UserDto> result = new ArrayList<>();
        List<Stream> streams = (List<Stream>) streamService.getAll();
        for(MyUser user : filteredUsers){
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setEmail(user.getEmail());
            userDto.setAvatar(Base64Helper.fileToBase64(user.getAvatar()));
            userDto.setInfo(user.getInfo());
            userDto.setRole(user.getRole());
            userDto.setCreatedAt(user.getCreatedAt());
            userDto.setUpdatedAt(user.getUpdatedAt());
            Optional<Stream> optional = streams.stream()
                    .filter(s -> s.getUser().getId().equals(user.getId())).findFirst();
            Stream stream = optional.orElse(null);
            userDto.setLive(stream.getLive());
            userDto.setViewersCount(stream.getViewersCount());

            List<Follow> allFollows = (List<Follow>) followService.getAll();
            List<Follow> filteredFollows = allFollows.stream()
                    .filter(f -> f.getOwner().getId().equals(user.getId())).toList();
            userDto.setFollowersCount(filteredFollows.size());
            result.add(userDto);
        }
        return ResponseEntity.ok(result);

    }

    
    @GetMapping(path="/test")
    public String test() {
        return "Hello, ALL DONE";
    }
}
