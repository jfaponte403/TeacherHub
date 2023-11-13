package com.TOTeams.TeacherHub.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(
  name = "grade",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"id"})
  }
)
public class Grade {

  @Id
  @Column(columnDefinition = "varchar(36)")
  private String id;

  @ManyToOne
  @JoinColumn(name = "id_student")
  private User student;

  @ManyToOne
  @JoinColumn(name = "id_professor_subject")
  private TeacherSubject teacherSubject;

  @Column(nullable = false)
  private String comment;

  @Column(nullable = false)
  private Boolean isPositive;

  @Column(nullable = false)

  private Float note;
}
