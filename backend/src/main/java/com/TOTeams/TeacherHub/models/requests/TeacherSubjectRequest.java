package com.TOTeams.TeacherHub.models.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherSubjectRequest {
  String id;
  String idTeacher;
  String idSubject;
}
