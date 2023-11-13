package com.TOTeams.TeacherHub.models.responses;

import com.TOTeams.TeacherHub.models.Role;
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
    Role role;
    boolean active;
}
