package com.TOTeams.TeacherHub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.TOTeams.TeacherHub.models.User;

public interface UserRespository extends JpaRepository<User, String> {

   Optional<User> findByEmail(String email);
   @Query(value = "SELECT hash FROM student WHERE student.email = ?1", nativeQuery = true)
   Optional<String> findHashByEmail(String email);

   @Modifying
   @Query("UPDATE User u SET u.is_active = ?2 WHERE u.id = ?1")
   int activateUser(String id, boolean active);

}