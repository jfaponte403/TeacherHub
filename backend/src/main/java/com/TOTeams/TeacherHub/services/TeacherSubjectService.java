package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.models.Subject;
import com.TOTeams.TeacherHub.models.Teacher;
import com.TOTeams.TeacherHub.models.TeacherSubject;
import com.TOTeams.TeacherHub.models.requests.TeacherSubjectRequest;
import com.TOTeams.TeacherHub.repositories.TeacherSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherSubjectService {

  private final TeacherSubjectRepository teacherSubjectRepository;

  public Page<TeacherSubject> getTeacherSubjectsByTeacherId(String teacherId, Pageable pageable) {
    return teacherSubjectRepository.findByTeacherId(teacherId, pageable);
  }

  public TeacherSubject getTeacherSubjectByTeacherAndSubject(String teacherId, String subjectId) {
    return teacherSubjectRepository.findByTeacherIdAndSubjectId(teacherId, subjectId);
  }

  public TeacherSubject saveTeacherSubject(TeacherSubjectRequest teacherSubject) {
    Teacher teacher = new Teacher();
    teacher.setId(teacherSubject.getIdTeacher());
    Subject subject = new Subject();
    subject.setId(teacherSubject.getIdSubject());
    return teacherSubjectRepository.save(new TeacherSubject(teacherSubject.getId(), teacher, subject));
  }

}
