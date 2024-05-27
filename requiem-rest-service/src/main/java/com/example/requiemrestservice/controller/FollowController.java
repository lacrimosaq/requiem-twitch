package com.example.requiemrestservice.controller;

import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.service.FollowService;
import com.example.requiemrestservice.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/follow")
@CrossOrigin(origins = "http://localhost:3000")
public class FollowController {
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private FollowService followService;

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

    @PostMapping(path="/following/{id}")
    public @ResponseBody ResponseEntity<?> CreateFollow(@PathVariable Integer id, @RequestParam Integer idfrom) {
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

}
