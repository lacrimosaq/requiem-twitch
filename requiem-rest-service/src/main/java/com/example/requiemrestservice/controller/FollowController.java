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
@RequestMapping("/follow")
@CrossOrigin(origins = "${react.app.url}")
public class FollowController {
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private FollowService followService;
    @Autowired
    private StreamService streamService;

    @GetMapping(path="/isFollowing/{id}")
    public @ResponseBody ResponseEntity<?> isFollowing(@PathVariable Integer id, @RequestParam Integer idfrom) {
        MyUser owner = (myUserService.getById(id).isPresent() ? myUserService.getById(id).get() : null);
        MyUser follower = (myUserService.getById(idfrom).isPresent() ? myUserService.getById(idfrom).get() : null);
        if (owner != null && follower != null) {
            List<Follow> follows = (List<Follow>) followService.getAll();
            Optional<Follow> result = follows.stream()
                    .filter(f -> f.getOwner().getId().equals(owner.getId()) && f.getFollower().getId().equals(follower.getId()))
                    .findFirst();

            return ResponseEntity.ok(result.isPresent());
        }
        return ResponseEntity.badRequest().body("Not such a users!");
    }

    @PostMapping(path="/follow/{id}")
    public @ResponseBody ResponseEntity<?> createFollow(@PathVariable Integer id, @RequestParam Integer idfrom) {
        if(Objects.equals(id, idfrom)) return ResponseEntity.badRequest().body("You can not follow yourself!");
        MyUser owner = (myUserService.getById(id).isPresent() ? myUserService.getById(id).get() : null);
        MyUser follower = (myUserService.getById(idfrom).isPresent() ? myUserService.getById(idfrom).get() : null);
        if (owner != null && follower != null) {
            List<Follow> follows = (List<Follow>) followService.getAll();
            Optional<Follow> result = follows.stream()
                    .filter(f -> f.getOwner().getId().equals(owner.getId()) && f.getFollower().getId().equals(follower.getId()))
                    .findFirst();

            //unfollowing
            if(result.isPresent()){
                Follow follow = result.get();
                try {
                    followService.delete(follow.getId());
                    return ResponseEntity.ok("Unfollowing was successfully completed!");
                }
                catch (Exception ex){
                    return ResponseEntity.badRequest().body(ex.getMessage());
                }

            }

            //following
            else{
                Follow follow = new Follow();
                follow.setFollower(follower);
                follow.setOwner(owner);

                try {
                    Follow added = followService.save(follow);
                    return ResponseEntity.ok("Following was successfully completed!");
                }
                catch (Exception ex){
                    return ResponseEntity.badRequest().body(ex.getMessage());
                }
            }

        }
        return ResponseEntity.badRequest().body("Not such a users!");
    }

    @GetMapping(path="/following/{id}")
    public @ResponseBody ResponseEntity<?> getFollowing(@PathVariable Integer id){
        boolean check = myUserService.getById(id).isPresent();
        if (check) {
            MyUser myUser = myUserService.getById(id).get();
            List<Follow> allFollows = (List<Follow>) followService.getAll();
            List<MyUser> allUsers = (List<MyUser>) myUserService.getAll();

            List<Follow> filteredFollows = allFollows.stream()
                    .filter(f -> f.getFollower().getId().equals(myUser.getId()))
                    .toList();

            List<MyUser> usersResult = allUsers.stream()
                    .filter(user -> filteredFollows.stream()
                            .anyMatch(follow -> follow.getOwner().getId().equals(user.getId())))
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
        return ResponseEntity.badRequest().body("Not such a user!");
    }

    @GetMapping(path="/follower/{id}")
    public @ResponseBody ResponseEntity<?> getFollower(@PathVariable Integer id){
        boolean check = myUserService.getById(id).isPresent();
        if (check) {
            MyUser myUser = myUserService.getById(id).get();
            List<Follow> allFollows = (List<Follow>) followService.getAll();
            List<MyUser> allUsers = (List<MyUser>) myUserService.getAll();

            List<Follow> filteredFollows = allFollows.stream()
                    .filter(f -> f.getOwner().getId().equals(myUser.getId()))
                    .toList();

            List<MyUser> usersResult = allUsers.stream()
                    .filter(user -> filteredFollows.stream()
                            .anyMatch(follow -> follow.getFollower().getId().equals(user.getId())))
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
        return ResponseEntity.badRequest().body("Not such a user!");
    }
}
