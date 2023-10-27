package com.TOTeams.TeacherHub.models.responses;

import com.TOTeams.TeacherHub.models.Subject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherResponse {
    String id;
    String name;
    List<Subject> subjects;
}
