package com.TOTeams.TeacherHub.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRespository extends JpaRepository<User, String> {
   Optional<User> findByEmail(String email);
}
