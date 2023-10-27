package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Subject;
import com.TOTeams.TeacherHub.models.Teacher;
import com.TOTeams.TeacherHub.models.TeacherSubject;
import com.TOTeams.TeacherHub.models.requests.TeacherSubjectRequest;
import com.TOTeams.TeacherHub.repositories.TeacherSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherSubjectService {

  private final TeacherSubjectRepository teacherSubjectRepository;

  public TeacherSubject saveTeacherSubject(TeacherSubjectRequest teacherSubject) {
    Teacher teacher = new Teacher();
    teacher.setId(teacherSubject.getIdTeacher());
    Subject subject = new Subject();
    subject.setId(teacherSubject.getIdSubject());
    return teacherSubjectRepository.save(new TeacherSubject(teacherSubject.getId(), teacher, subject));
  }

}
