package com.TOTeams.TeacherHub.controllers;

import java.util.NoSuchElementException;
import java.util.stream.Stream;

import javax.naming.AuthenticationException;

import com.TOTeams.TeacherHub.security.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.TOTeams.TeacherHub.services.AuthService;
import com.TOTeams.TeacherHub.services.AuthCodeService;
import com.TOTeams.TeacherHub.util.ResponseHandler;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;
  private final AuthCodeService authCodeService;

  @PostMapping("login")
  public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
    boolean allNeedFields = Stream.of(
      request.getEmail(),
      request.getPassword()
    ).allMatch(value ->
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  @PostMapping("register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {

    String path = "auth/register";
    boolean allNeedFields = Stream.of(
      request.getId(),
      request.getEmail(),
      request.getPassword(),
      request.getNickname()
    ).allMatch(value ->
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

    authCodeService.registerCode(request.getId().toString());

    return ResponseEntity.ok(authResponse);
  }

  @PostMapping("/verifyCode")
  public ResponseEntity<Object> verifyCode(@RequestBody VerifyCodeRequest request) {
    String path = "auth/verifyCode";
    boolean allNeedFields = Stream.of(
      request.getStudentId(),
      request.getVerificationCode()
    ).allMatch(value ->
      value != null || (value instanceof String && !((String) value).isEmpty())
    );

    if (!allNeedFields) {
      return ResponseHandler
              .generateResponse(
                      HttpStatus.BAD_REQUEST,
                      path,
                      "Any required field hasn't been specified"
              );
    }

    if (authCodeService.verifyCodeAndUpdateStatus(request.getStudentId(), request.getVerificationCode())) {
      return ResponseEntity.ok("Verification process has been validated.");
    } else {
      return ResponseEntity.badRequest().body("The code provided is not valid.");
    }
  }

  @PostMapping("/updatePassword")
    public ResponseEntity<Object> updatePassword(@RequestBody PasswordRequest request) {
        String path = "auth/updatePassword";
        boolean allNeedFields = Stream.of(
        request.getStudentId(),
        request.getNewPassword(),
        request.getVerificationCode()
        ).allMatch(value ->
        value != null || (value instanceof String && !((String) value).isEmpty())
        );

        if (!allNeedFields) {
        return ResponseHandler
                .generateResponse(
                        HttpStatus.BAD_REQUEST,
                        path,
                        "Any required field hasn't been specified"
                );
        }

        if (authCodeService.verifyCodeAndUpdatePassword(request.getStudentId(), request.getVerificationCode(), request.getNewPassword())) {
          return ResponseEntity.ok("Password has been updated.");
        } else {
          return ResponseEntity.badRequest().body("The code provided is not valid.");
        }
    }

  @PostMapping("/generateCode")
  public ResponseEntity<Object> generateCode(@RequestBody AuthCodeRequest request) {
    String path = "auth/generateCode";
    boolean allNeedFields = Stream.of(
      request.getStudentId()
    ).allMatch(value ->
      value != null || (value instanceof String && !((String) value).isEmpty())
    );

    if (!allNeedFields) {
      return ResponseHandler
              .generateResponse(
                      HttpStatus.BAD_REQUEST,
                      path,
                      "Any required field hasn't been specified"
              );
    }

    if(authCodeService.registerCode(request.getStudentId())) {
      return ResponseEntity.ok("Code has been generated.");
    } else {
      return ResponseEntity.badRequest().body("The code provided is not valid.");
    }
  }

}

// get endpoint for generating a code