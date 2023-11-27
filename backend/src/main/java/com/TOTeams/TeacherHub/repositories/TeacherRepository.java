package com.TOTeams.TeacherHub.repositories;

import com.TOTeams.TeacherHub.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {

}
