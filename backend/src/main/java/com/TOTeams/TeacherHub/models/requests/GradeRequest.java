package com.TOTeams.TeacherHub.models.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeRequest {
  private String id;
  private String idStudent;
  private String idTeacherSubject;
  private String comment;
  private Boolean isPositive;
  private Float note;
}
