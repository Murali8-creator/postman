package com.postmaster.postmaster.service;


import com.postmaster.postmaster.entity.User;
import com.postmaster.postmaster.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;
    public void saveUser(User user) {
         userRepository.save(user);
    }


    public Optional<User> getUser(Long userId) {
        if (userId != null){
            return userRepository.findById(userId);
        }
        return null;
    }


    public void deleteUser(Long userId) {
         userRepository.deleteById(userId);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
