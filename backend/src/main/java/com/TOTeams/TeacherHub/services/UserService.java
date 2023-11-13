package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Role;
import com.TOTeams.TeacherHub.models.User;
import com.TOTeams.TeacherHub.models.requests.StudentRequest;
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
                    .role(u.getRole())
                    .active(u.getActive())
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
                .role(u.getRole())
                .active(u.getActive())
                .build();
    }

    public boolean updateStudent(StudentRequest student) {
        User u = userRepository.findById(student.getId()).orElseThrow();
        u.setNickname(student.getNickname());
        u.setEmail(student.getEmail());
        u.setRole(Role.fromValue(student.getIdRole()));
        u.setActive(student.isActive());
        try {
            userRepository.save(u);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteUser(String id) {
        userRepository.deleteById(id);
        return true;
    }

}
