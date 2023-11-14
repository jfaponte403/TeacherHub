package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Grade;
import com.TOTeams.TeacherHub.models.responses.GradeByIdTeacherSubjectResponse;
import com.TOTeams.TeacherHub.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class GradeService {

  private final GradeRepository gradeRepository;

  public List<Grade> getGrades() {
    return gradeRepository.findAll();
  }

  public Grade getGradeByIdStudentAndIdTeacherSubject(String idStudent, String idTeacherSubject) {
    return gradeRepository.findByStudentIdAndTeacherSubjectId(idStudent, idTeacherSubject).orElse(null);
  }

  public List<GradeByIdTeacherSubjectResponse> getGradesByIdTeacherSubject(String idTeacherSubject) {
    List<Grade> grades = gradeRepository.findByTeacherSubjectId(idTeacherSubject).orElseThrow();
    List<GradeByIdTeacherSubjectResponse> response = new ArrayList<>();

    for (Grade grade : grades) {
      response.add(
        GradeByIdTeacherSubjectResponse
          .builder()
          .id(grade.getId())
          .student(grade.getStudent())
          .comment(grade.getComment())
          .isPositive(grade.getIsPositive())
          .note(grade.getNote())
          .build()
      );
    }

    return response;
  }

  public Boolean createGrade(Grade grade) {
    gradeRepository.save(grade);
    return true;
  }

  public Boolean deleteGrade(String idGrade) {
    try {
      gradeRepository.deleteById(idGrade);
      return true;
    } catch (NoSuchElementException e) {
      throw e;
    } catch (Exception e) {
      return false;
    }
  }

}
