package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.TeacherSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject, String> {
  Page<TeacherSubject> findByTeacherId(String teacherId, Pageable pageable);

  TeacherSubject findByTeacherIdAndSubjectId(String teacherId, String subjectId);
}
