package com.TOTeams.TeacherHub.Auth;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TOTeams.TeacherHub.Auth.Models.LoginRequest;
import com.TOTeams.TeacherHub.Auth.Models.RegisterRequest;
import com.TOTeams.TeacherHub.Util.ResponseHandler;

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
    ).anyMatch(value -> 
      value == null || (value instanceof String && !value.isEmpty())
    );

    if (allNeedFields) 
      return ResponseEntity.ok(authService.login(request));
    else 
      return ResponseHandler
        .generateResponse(
          HttpStatus.BAD_REQUEST, 
          "auth/login", 
          "Bad request"
        );
  }

  @PostMapping("register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
    boolean allNeedFields = Stream.of(
      request.getId(),
      request.getEmail(),
      request.getPassword()
    ).anyMatch(value -> 
      value == null || (value instanceof String && !((String) value).isEmpty())
    );

    if (allNeedFields) 
      return ResponseEntity.ok(authService.register(request));
    else return ResponseHandler
      .generateResponse(
        HttpStatus.BAD_REQUEST, 
        "auth/register", 
        "Bad request"
      );
  }

} 