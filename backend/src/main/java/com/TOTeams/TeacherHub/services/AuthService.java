package com.TOTeams.TeacherHub.services;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TOTeams.TeacherHub.models.Role;
import com.TOTeams.TeacherHub.models.User;
import com.TOTeams.TeacherHub.repositories.UserRespository;
import com.TOTeams.TeacherHub.security.SaltService;
import com.TOTeams.TeacherHub.security.jwt.JwtService;
import com.TOTeams.TeacherHub.security.models.AuthResponse;
import com.TOTeams.TeacherHub.security.models.LoginRequest;
import com.TOTeams.TeacherHub.security.models.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  @Autowired
  private final UserRespository userRespository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;  
  private final SaltService saltService;

  public AuthResponse login(LoginRequest request) throws AuthenticationException {
    User user = userRespository.findByEmail(request.getEmail()).orElseThrow();
    
    authenticationManager
      .authenticate(
        new UsernamePasswordAuthenticationToken(
          request.getEmail(), 
          user.getHash() + request.getPassword()
        )
      );

    String token = jwtService.getToken(user);

    return AuthResponse
      .builder()
      .token(token)
      .build();
  }

  
  public AuthResponse register(RegisterRequest request) {
    String hash = saltService.generateSalt();
    User user = User
      .builder()
      .id(request.getId())
      .nickname(request.getNickname())
      .email(request.getEmail())
      .password(passwordEncoder.encode(hash + request.getPassword()))
      .role(Role.USER)
      .hash(hash)
      .build();

    try {
      userRespository.save(user);
    } catch (DataIntegrityViolationException e) {
      throw e;
    }
      
    return AuthResponse
      .builder()
      .token(jwtService.getToken(user))
      .build();
  }
  
}
