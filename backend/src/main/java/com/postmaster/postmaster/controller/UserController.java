package com.postmaster.postmaster.controller;


import com.postmaster.postmaster.entity.User;
import com.postmaster.postmaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://127.0.0.1:5500/")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user){
         userService.saveUser(user);

         return new ResponseEntity<>(user,HttpStatus.CREATED);
    }

    @GetMapping(value = "/{userId}")
    public Optional<User> getUser(@PathVariable(required = false) Long userId){
        return userService.getUser(userId);
    }

    @GetMapping(value = "/getUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable Long userId){
         userService.deleteUser(userId);
         return new ResponseEntity<>(HttpStatus.OK);
    }
}
