package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Teacher;
import com.TOTeams.TeacherHub.models.requests.TeacherRequest;
import com.TOTeams.TeacherHub.repositories.TeacherRepository;
import com.TOTeams.TeacherHub.models.responses.TeacherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final TeacherSubjectService teacherSubjectService;

    public TeacherResponse getTeacherById(String id) {
        Teacher t = teacherRepository.findById(id).orElseThrow();
        return TeacherResponse
            .builder()
            .id(t.getId())
            .name(t.getName())
            .subjects(t.getSubjects())
            .build();
    }

    public boolean updateTeacher(TeacherResponse teacher) {
        Teacher t = teacherRepository.findById(teacher.getId()).orElseThrow();
        t.setName(teacher.getName());
        teacherRepository.save(t);
        return true;
    }

    public boolean addTeacher(TeacherRequest teacher) {
        Teacher t = Teacher
            .builder()
            .id(teacher.getId())
            .name(teacher.getName())
            .build();
        teacherRepository.save(t);
        return true;
    }


    public Page<TeacherResponse> getAllTeachers(Pageable pageable) {
        List<TeacherResponse> teachers = new ArrayList<>();
        for(Teacher t : teacherRepository.findAll(pageable).getContent()) {
            teachers.add(TeacherResponse
                .builder()
                .id(t.getId())
                .name(t.getName())
                .subjects(t.getSubjects())
                .build());
        }
        return new PageImpl<>(teachers, pageable, teachers.size());
    }

    public boolean deleteTeacher(String id) {
        teacherRepository.deleteById(id);
        return true;
    }
}
