package com.TOTeams.TeacherHub.security.models;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {  
  String id;
  String nickname;  
  String email;
  String password;
}
