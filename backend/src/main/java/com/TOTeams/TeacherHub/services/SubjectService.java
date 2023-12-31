package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Subject;
import com.TOTeams.TeacherHub.repositories.SubjectRepository;
import com.TOTeams.TeacherHub.models.requests.SubjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public Page<SubjectRequest> getAllSubjects(Pageable pageable) {
        List<SubjectRequest> subjects = new ArrayList<>();
        for (Subject s : subjectRepository.findAll(pageable).getContent()) {
            subjects.add(
                SubjectRequest
                    .builder()
                    .id(s.getId())
                    .name(s.getName())
                    .teachers(s.getTeachers())
                    .build()
            );
        }
        return new PageImpl<>(subjects, pageable, subjects.size());
    }

    public boolean createSubject(SubjectRequest subject) {
        Subject s = Subject
                .builder()
                .id(subject.getId())
                .name(subject.getName())
                .build();
        subjectRepository.save(s);
        return true;
    }

    public SubjectRequest getSubjectById(String id) {
        Subject s = subjectRepository.findById(id).orElseThrow();
        return SubjectRequest
                .builder()
                .id(s.getId())
                .name(s.getName())
                .build();
    }

    public boolean updateSubject(SubjectRequest subject) {
        Subject s = subjectRepository.findById(subject.getId()).orElseThrow();
        s.setName(subject.getName());
        subjectRepository.save(s);
        return true;
    }

    public boolean deleteSubject(String id) {
        subjectRepository.deleteById(id);
        return true;
    }

}
