package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.Subject;
import com.TOTeams.TeacherHub.models.TeacherSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject, String> {
}
