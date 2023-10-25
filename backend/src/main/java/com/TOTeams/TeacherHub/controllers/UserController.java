package com.TOTeams.TeacherHub.controllers;

import com.TOTeams.TeacherHub.security.models.StudentResponse;
import com.TOTeams.TeacherHub.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;
import com.TOTeams.TeacherHub.util.ResponseHandler;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<StudentResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public StudentResponse getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping
    public ResponseEntity<Object> updateUser(@RequestBody StudentResponse student) {
        boolean allNeedFields = Stream.of(
                student.getId(),
                student.getNickname(),
                student.getEmail(),
                student.getId_role(),
                student.is_active()
        ).allMatch(value -> value != null && !(value instanceof String) || !((String) value).isEmpty());

        if (!allNeedFields)
            return ResponseHandler
                    .generateResponse(
                            HttpStatus.BAD_REQUEST,
                            "users/update",
                            "Any required field hasn't been specified"
                    );

        if(userService.updateStudent(student)){
            return ResponseHandler
                    .generateResponse(
                            HttpStatus.OK,
                            "users/update",
                            "User updated successfully"
                    );
        }
        return ResponseHandler.generateResponse(
                HttpStatus.BAD_REQUEST,
                "users/update",
                "User not updated"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable String id) {
        if(userService.deleteUser(id)){
            return ResponseHandler
                    .generateResponse(
                            HttpStatus.OK,
                            "users/delete",
                            "User deleted successfully"
                    );
        }
        return ResponseHandler.generateResponse(
                HttpStatus.BAD_REQUEST,
                "users/delete",
                "User not deleted"
        );
    }

}
