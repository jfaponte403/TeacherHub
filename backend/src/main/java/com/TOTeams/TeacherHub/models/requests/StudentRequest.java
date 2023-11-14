package com.TOTeams.TeacherHub.models.requests;

import com.TOTeams.TeacherHub.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {
  String id;
  String nickname;
  String email;
  int idRole;
  Boolean active;
}
