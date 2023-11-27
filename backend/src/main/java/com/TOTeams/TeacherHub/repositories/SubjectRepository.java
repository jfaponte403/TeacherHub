package com.TOTeams.TeacherHub.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TOTeams.TeacherHub.models.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {
}