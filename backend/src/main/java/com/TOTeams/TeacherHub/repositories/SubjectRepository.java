package com.TOTeams.TeacherHub.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.TOTeams.TeacherHub.models.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {
    Optional<Subject> findById(String id);

    @Query(value = "SELECT * FROM subject WHERE name = ?1", nativeQuery = true)
    List<Subject> findByName(String name);
}