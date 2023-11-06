package com.TOTeams.TeacherHub.controllers;

import com.TOTeams.TeacherHub.models.TeacherSubject;
import com.TOTeams.TeacherHub.models.requests.TeacherSubjectRequest;
import com.TOTeams.TeacherHub.services.TeacherSubjectService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("teacherhub/api/teacherSubject")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TeacherSubjectController {

  @Autowired
  private final TeacherSubjectService teacherSubjectService;

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping
  public ResponseEntity<Object> saveTeacherSubject(@RequestBody TeacherSubjectRequest teacherSubject) {
    TeacherSubject teacherSubjectSaved = teacherSubjectService.saveTeacherSubject(teacherSubject);
    if (teacherSubjectSaved != null) return ResponseEntity.ok(teacherSubjectSaved);
    return ResponseEntity.internalServerError().build();
  }

}
