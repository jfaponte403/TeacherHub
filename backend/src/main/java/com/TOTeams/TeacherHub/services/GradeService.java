package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Grade;
import com.TOTeams.TeacherHub.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    return gradeRepository.findByStudentIdAndTeacherSubjectId(idStudent, idTeacherSubject).orElseThrow();
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
