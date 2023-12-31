package com.TOTeams.TeacherHub.repositories;

import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.TOTeams.TeacherHub.models.Code;
import org.springframework.data.repository.query.Param;

public interface CodeRepository extends JpaRepository<Code, String> {
    @Query("SELECT c FROM Code c WHERE c.id_student = :idStudent")
    Optional<Code> findByIdStudent(@Param("idStudent") String idStudent);

    @Transactional
    @Modifying
    @Query("DELETE FROM Code c WHERE c.id_student = :idStudent")
    void deleteByIdStudent(String idStudent);
}
