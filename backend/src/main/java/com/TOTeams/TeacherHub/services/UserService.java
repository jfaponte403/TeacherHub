package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Role;
import com.TOTeams.TeacherHub.models.User;
import com.TOTeams.TeacherHub.repositories.UserRespository;
import com.TOTeams.TeacherHub.models.responses.StudentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRespository userRepository;

    public List<StudentResponse> getAllUsers() {
        List<StudentResponse> users = new ArrayList<>();
        for(User u : userRepository.findAll()) {
            users.add(
                StudentResponse
                    .builder()
                    .id(u.getId())
                    .nickname(u.getNickname())
                    .email(u.getEmail())
                    .id_role(u.getId_role().getValue())
                    .is_active(u.is_active())
                    .build()
            );
        }

        return users;
    }

    public StudentResponse getUserById(String id) {
        User u = userRepository.findById(id).orElseThrow();
        return
            StudentResponse
                .builder()
                .id(u.getId())
                .nickname(u.getNickname())
                .email(u.getEmail())
                .id_role(u.getId_role().getValue())
                .is_active(u.is_active())
                .build();
    }

    public boolean updateStudent(StudentResponse student) {
        User u = userRepository.findById(student.getId()).orElseThrow();
        u.setNickname(student.getNickname());
        u.setEmail(student.getEmail());
        u.setId_role(Role.fromValue(student.getId_role()));
        u.setIs_active(student.is_active());
        userRepository.save(u);
        return true;
    }

    public boolean deleteUser(String id) {
        userRepository.deleteById(id);
        return true;
    }

}
