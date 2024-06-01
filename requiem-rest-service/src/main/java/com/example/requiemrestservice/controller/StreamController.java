package com.example.requiemrestservice.controller;

import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.model.Stream;
import com.example.requiemrestservice.service.MyUserService;
import com.example.requiemrestservice.service.StreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/stream")
@CrossOrigin(origins = "http://localhost:3000")
public class StreamController {
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private StreamService streamService;

    @GetMapping(path="/user/{id}")
    public @ResponseBody ResponseEntity<?> getStream(@PathVariable Integer id) {
        MyUser myUser = myUserService.getById(id).isPresent() ? myUserService.getById(id).get() : null;
        if (myUser != null) {
            Stream stream= streamService.getByUserId(myUser.getId());
            return ResponseEntity.ok(stream);
        }
        return ResponseEntity.badRequest().body("Not such a user!");
    }

    @PutMapping("/edit/{id}")
    public @ResponseBody ResponseEntity<?> editStream(@PathVariable Integer id, @RequestBody Stream model)
    {
        MyUser myUser = myUserService.getById(id).isPresent() ? myUserService.getById(id).get() : null;
        if (myUser != null) {
            Stream myStream= streamService.getByUserId(myUser.getId());
            boolean nameNotEqual = !Objects.equals(myStream.getName(), model.getName()) && model.getName() != null;
            boolean followerChatNotEqual = !Objects.equals(myStream.getFollowerChat(), model.getFollowerChat()) && model.getFollowerChat() != null;
            boolean chatDelayNotEqual = !Objects.equals(myStream.getChatDelay(), model.getChatDelay()) && model.getChatDelay() != null;

            if (!nameNotEqual && !followerChatNotEqual && !chatDelayNotEqual) {
                return ResponseEntity.badRequest().body("There are nothing to update");
            }

            if (nameNotEqual)         myStream.setName(model.getName());
            if (followerChatNotEqual) myStream.setFollowerChat(model.getFollowerChat());
            if (chatDelayNotEqual)    myStream.setChatDelay(model.getChatDelay());

            try {
                streamService.updateById(myStream.getId(), myStream);
            }
            catch (Exception ex){
                return ResponseEntity.badRequest().body("Error! " + ex.getMessage());
            }


            return ResponseEntity.ok(myStream);
        }
        return ResponseEntity.badRequest().body("Not such a user!");

    }

}
