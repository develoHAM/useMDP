package com.example.demo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public String getMain(){
        return "getMain";
    }
    @PostMapping("/api/test")
    public String postMain2() {
        return "postMapping";
    }
    @PostMapping("/api/test2")
    public String postMain(@RequestBody Person person){
        // name, age
        return "person : age - " + person.getAge() + ", name - " + person.getName();
    }

    public static class Person {
        private String name;
        private int age;
        public String getName(){ return this.name; }
        public int getAge(){ return this.age; }
    }

    @PostMapping("/api/cookie")
    public String sendCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth", "AAAAAAAAA");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(24 * 60 * 60);
        System.out.println("TEST cookie = " + cookie.getValue());
        response.addCookie(cookie);

        return "COOKIE";
    }

}