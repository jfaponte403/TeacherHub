package com.TOTeams.TeacherHub.security.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    String id;
    String nickname;
    String email;
    int id_role;
    boolean is_active;
}
