package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, String> {
  Optional<Grade> findByStudentIdAndTeacherSubjectId(String idUser, String idTeacherSubject);
  Optional<List<Grade>> findByTeacherSubjectId(String idTeacherSubject);

}
