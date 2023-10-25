package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Teacher;
import com.TOTeams.TeacherHub.repositories.TeacherRepository;
import com.TOTeams.TeacherHub.security.models.TeacherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final SubjectService subjectService;

    public TeacherResponse getTeacherById(String id) {
        Teacher t = teacherRepository.findById(id).orElseThrow();
        return TeacherResponse
                .builder()
                .id(t.getId())
                .name(t.getName())
                //.subjects(subjectService.getByTeacherId(t.getId()))
                .build();
    }

    public boolean updateTeacher(TeacherResponse teacher) {
        Teacher t = teacherRepository.findById(teacher.getId()).orElseThrow();
        t.setName(teacher.getName());
        teacherRepository.save(t);
        return true;
    }

    public boolean addTeacher(TeacherResponse teacher) {
        Teacher t = Teacher
                .builder()
                .name(teacher.getName())
                .build();
        teacherRepository.save(t);
        return true;
    }


    public List<TeacherResponse> getAllTeachers() {
        List<TeacherResponse> teachers = new ArrayList<>();
        for(Teacher t : teacherRepository.findAll()) {
                teachers.add(TeacherResponse
                        .builder()
                        .id(t.getId())
                        .name(t.getName())
                        //.subjects(subjectService.getByTeacherId(t.getId()))
                        .build());
        }
        return teachers;
    }

    public boolean deleteTeacher(String id) {
        teacherRepository.deleteById(id);
        return true;
    }
}
