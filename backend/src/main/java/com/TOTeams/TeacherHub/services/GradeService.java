package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Grade;
import com.TOTeams.TeacherHub.models.responses.GradeByIdTeacherSubjectResponse;
import com.TOTeams.TeacherHub.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class GradeService {

  private final GradeRepository gradeRepository;

  public Page<Grade> getGrades(Pageable pageable) {
    return gradeRepository.findAll(pageable);
  }

  public Grade getGradeByIdStudentAndIdTeacherSubject(String idStudent, String idTeacherSubject) {
    return gradeRepository.findByStudentIdAndTeacherSubjectId(idStudent, idTeacherSubject).orElse(null);
  }

  public Page<GradeByIdTeacherSubjectResponse> getGradesByIdTeacherSubject(String idTeacherSubject, Pageable pageable) {
    Page<Grade> grades = gradeRepository.findByTeacherSubjectId(idTeacherSubject, pageable);
    List<GradeByIdTeacherSubjectResponse> response = new ArrayList<>();

    for (Grade grade : grades.getContent()) {
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

    return new PageImpl<>(response, pageable, response.size());
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
