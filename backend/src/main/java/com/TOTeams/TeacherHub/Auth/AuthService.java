package com.TOTeams.TeacherHub.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TOTeams.TeacherHub.Auth.Models.AuthResponse;
import com.TOTeams.TeacherHub.Auth.Models.LoginRequest;
import com.TOTeams.TeacherHub.Auth.Models.RegisterRequest;
import com.TOTeams.TeacherHub.Jwt.JwtService;
import com.TOTeams.TeacherHub.User.Role;
import com.TOTeams.TeacherHub.User.User;
import com.TOTeams.TeacherHub.User.UserRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  @Autowired
  private final UserRespository userRespository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    UserDetails user = userRespository.findByEmail(request.getEmail()).orElseThrow();
    String token = jwtService.getToken(user);
    return AuthResponse
      .builder()
      .token(token)
      .build();
  }

  public AuthResponse register(RegisterRequest request) {
    User user = User
      .builder()
      .id(request.getId())
      .nickname(request.getNickname())
      .email(request.getEmail())
      .password(passwordEncoder.encode(request.getPassword()))
      .role(Role.USER)
      .build();

    userRespository.save(user);
      
    return AuthResponse
      .builder()
      .token(jwtService.getToken(user))
      .build();
  }
  
}
