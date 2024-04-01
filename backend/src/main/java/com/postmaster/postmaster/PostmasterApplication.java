package com.postmaster.postmaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PostmasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostmasterApplication.class, args);
	}

}
