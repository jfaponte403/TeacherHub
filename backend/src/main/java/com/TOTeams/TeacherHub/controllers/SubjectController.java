package com.TOTeams.TeacherHub.controllers;

import com.TOTeams.TeacherHub.models.requests.SubjectRequest;
import com.TOTeams.TeacherHub.util.ResponseHandler;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.TOTeams.TeacherHub.services.SubjectService;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("teacherhub/api/subjects")
@AllArgsConstructor
public class SubjectController {
    @Autowired
    private final SubjectService subjectService;
    @GetMapping
    public List<SubjectRequest> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public SubjectRequest getSubjectById(@PathVariable String id) {
        return subjectService.getSubjectById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> createSubject(@RequestBody SubjectRequest subject) {
        boolean allNeedFields = Stream.of(
            subject.getName()
        ).allMatch(value -> value != null && !value.isEmpty());

        if (!allNeedFields)
            return ResponseHandler
                .generateResponse(
                    HttpStatus.BAD_REQUEST,
                    "subjects/create",
                    "Any required field hasn't been specified"
                );

        if(subjectService.createSubject(subject)){
            return ResponseHandler
                .generateResponse(
                    HttpStatus.OK,
                    "subjects/create",
                    "Subject created successfully"
                );
        }

        return ResponseHandler.generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "subjects/create",
            "Subject not created"
        );
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> updateSubject(@RequestBody SubjectRequest subject) {
        boolean allNeedFields = Stream.of(
            subject.getId(),
            subject.getName()
        ).allMatch(value -> value != null && !((String) value).isEmpty());

        if (!allNeedFields)
            return ResponseHandler
                .generateResponse(
                    HttpStatus.BAD_REQUEST,
                    "subjects/update",
                    "Any required field hasn't been specified"
                );

        if(subjectService.updateSubject(subject)){
            return ResponseHandler
                .generateResponse(
                    HttpStatus.OK,
                    "subjects/update",
                    "Subject updated successfully"
                );
        }

        return ResponseHandler.generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "subjects/update",
            "Subject not updated"
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deleteSubject(@PathVariable String id) {
        if(subjectService.deleteSubject(id)){
            return ResponseHandler
                .generateResponse(
                    HttpStatus.OK,
                    "subjects/delete",
                    "Subject deleted successfully"
                );
        }

        return ResponseHandler.generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "subjects/delete",
            "Subject not deleted"
        );
    }

}
