package com.TOTeams.TeacherHub.controllers;

import com.TOTeams.TeacherHub.models.Grade;
import com.TOTeams.TeacherHub.models.TeacherSubject;
import com.TOTeams.TeacherHub.models.User;
import com.TOTeams.TeacherHub.models.requests.GradeRequest;
import com.TOTeams.TeacherHub.services.GradeService;
import com.TOTeams.TeacherHub.util.ResponseHandler;
import lombok.AllArgsConstructor;
import org.hibernate.TransientPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

@Controller
@RequestMapping("teacherhub/api/grades")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class GradeController {

  private final GradeService gradeService;

  @GetMapping
  public ResponseEntity<Object> getGrades() {
    return ResponseEntity.ok(gradeService.getGrades());
  }

  @PostMapping
  public ResponseEntity<Object> createGrade(@RequestBody GradeRequest grade) {
    String path = "grades/post";

    // Validates if the user has already rated the teacher
    if (gradeService.getGradeByIdStudentAndIdTeacherSubject(grade.getIdStudent(), grade.getIdTeacherSubject()) != null)
      return ResponseHandler
        .generateResponse(
          HttpStatus.CONFLICT,
          path,
          "The user has already rated the teacher."
        );

    boolean allNeedFields = Stream.of(
      grade.getId(),
      grade.getIdStudent(),
      grade.getIdTeacherSubject(),
      grade.getComment(),
      grade.getNote().toString(),
      grade.getIsPositive().toString()
    ).allMatch(
      value -> value != null && !value.isEmpty()
    );

    if (!allNeedFields)
      return ResponseHandler
        .generateResponse(
          HttpStatus.BAD_REQUEST,
          path,
          "Any required field hasn't been specified"
        );

    User user = User.builder().id(grade.getIdStudent()).build();
    TeacherSubject teacherSubject = TeacherSubject.builder().id(grade.getIdTeacherSubject()).build();

    try {
      gradeService.createGrade(
        Grade
          .builder()
          .id(grade.getId())
          .student(user)
          .teacherSubject(teacherSubject)
          .comment(grade.getComment())
          .note(grade.getNote())
          .isPositive(grade.getIsPositive())
          .build()
      );
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return
        ResponseHandler
          .generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            path,
            "An error has occurred"
          );
    }

    return
      ResponseHandler
        .generateResponse(
          HttpStatus.OK,
          path,
          "Grade has been created successfully"
        );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteGrade(@PathVariable String id) {
    String path = "grades/delete";

    try {
      gradeService.deleteGrade(id);
    } catch (NoSuchElementException e) {
      return
        ResponseHandler
          .generateResponse(
            HttpStatus.NOT_FOUND,
            path,
            "Grade don't exists"
          );
    } catch (Exception e) {
      ResponseHandler
        .generateResponse(
          HttpStatus.NOT_FOUND,
          path,
          "Grade couldn't be deleted"
        );
    }

    return
      ResponseHandler
        .generateResponse(
          HttpStatus.OK,
          path,
          "Grade has been deleted successfully"
        );
  }

}
