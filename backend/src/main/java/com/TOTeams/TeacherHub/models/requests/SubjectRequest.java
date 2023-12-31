package com.TOTeams.TeacherHub.models.requests;

import com.TOTeams.TeacherHub.models.Teacher;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectRequest {
    String id;
    String name;
    List<Teacher> teachers;
}
