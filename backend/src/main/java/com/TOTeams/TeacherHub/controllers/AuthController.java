package com.TOTeams.TeacherHub.controllers;

import java.util.NoSuchElementException;
import java.util.stream.Stream;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TOTeams.TeacherHub.security.models.AuthResponse;
import com.TOTeams.TeacherHub.security.models.LoginRequest;
import com.TOTeams.TeacherHub.security.models.RegisterRequest;
import com.TOTeams.TeacherHub.services.AuthService;
import com.TOTeams.TeacherHub.util.ResponseHandler;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private final AuthService authService;

  @PostMapping("login")
  public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
    boolean allNeedFields = Stream.of(
      request.getEmail(),
      request.getPassword()
    ).allMatch(value -> 
      // This validate if all fields are different to null or empty
      value != null || (value instanceof String && !value.isEmpty())
    );

    if (!allNeedFields) 
      return ResponseHandler
        .generateResponse(
          HttpStatus.BAD_REQUEST, 
          "auth/login", 
          "Any required field hasn't been specified"
        );

    AuthResponse response = null;
    try {
      response = authService.login(request);
    } catch (AuthenticationException e) {
      return ResponseHandler
        .generateResponse(
          HttpStatus.FORBIDDEN,  
          "auth/login", 
          "Email or password incorrects"
        );
    } catch (NoSuchElementException e) {
      return ResponseHandler
        .generateResponse(
          HttpStatus.NOT_FOUND,   
          "auth/login", 
          "The users doesn't exists"
        );
    }

    return ResponseEntity.ok(response);
  }

  @PostMapping("register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {

    String path = "auth/register";

    boolean allNeedFields = Stream.of(
      request.getId(),
      request.getEmail(),
      request.getPassword(),
      request.getNickname()
    ).allMatch(value -> 
      // This validate if all fields are different to null or empty
      value != null || (value instanceof String && !((String) value).isEmpty())
    );

    if (!allNeedFields) 
      return ResponseHandler
        .generateResponse(
          HttpStatus.BAD_REQUEST, 
          path, 
          "Any required field hasn't been specified"
        );
        
    AuthResponse authResponse = null;
    try {
      authResponse = authService.register(request);
    } catch (DataIntegrityViolationException duplicateDataExepction) {
      return ResponseHandler
        .generateResponse(
          HttpStatus.CONFLICT,
          path,
          "The user can't be created because the email or nickname is already registered."
        );
    }

    return ResponseEntity.ok(authResponse);
  }

} 