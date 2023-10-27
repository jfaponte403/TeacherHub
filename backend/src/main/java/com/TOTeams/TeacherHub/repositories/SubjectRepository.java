package com.TOTeams.TeacherHub.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TOTeams.TeacherHub.models.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {
//    @Query(value = "SELECT * FROM subject WHERE name = ?1", nativeQuery = true)
//    List<Subject> findByName(String name);

}