package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String>{
    Optional<Teacher> findById(String id);

    /*@Query("SELECT p FROM professor p WHERE p.id IN (SELECT id_professor FROM professor_subject WHERE id_subject = ?1)")
    List<Teacher> listBySubjectId(String subjectId);

    @Modifying
    @Query(value = "INSERT INTO subject_professor(id, id_professor, id_subject) VALUES (?1, ?3, ?2)", nativeQuery = true)
    @Transactional
    public void enrollTeacher(String id, String subjectId, String teacherId);

    @Modifying
    @Query(value = "DELETE FROM subject_professor WHERE id_subject = ?1 AND id_professor = ?2", nativeQuery = true)
    @Transactional
    public void unenrollTeacher(String subjectId, String teacherId);*/
}
