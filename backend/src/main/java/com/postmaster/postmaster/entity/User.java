package com.postmaster.postmaster.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "password")
    private String password;


    @Override
    public String toString(){
        return  "User Id : "+userId+
                " User Email: "+userEmail+
                " User Password: "+password;
    }
}
