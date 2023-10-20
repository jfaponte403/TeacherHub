package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface codeRepository extends JpaRepository<Code, String> {
    Code findByStudentId(String studentId);
};
