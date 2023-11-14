package com.TOTeams.TeacherHub.models.responses;

import com.TOTeams.TeacherHub.models.TeacherSubject;
import com.TOTeams.TeacherHub.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeByIdTeacherSubjectResponse {
  private String id;
  private User student;
  private String comment;
  private Boolean isPositive;
  private Float note;
}
