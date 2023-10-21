package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Subject;
import com.TOTeams.TeacherHub.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getSubjectById(String id) {
        return subjectRepository.findById(id);
    }

    public List<Subject> getSubjectsByName(String name) {
        return subjectRepository.findByName(name);
    }

}
