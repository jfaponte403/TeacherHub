package com.TOTeams.TeacherHub.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TOTeams.TeacherHub.util.ResponseHandler;

@RestController
@RequestMapping
public class ErrorController {
  
  @RequestMapping("/unauthorized")
  public ResponseEntity<Object> unauthorized() {
    return ResponseHandler
      .generateResponse(
        HttpStatus.UNAUTHORIZED, 
        "/unauthorized",
        "You aren't authorized for access to this link."
      );
  }

}
