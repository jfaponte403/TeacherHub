package com.TOTeams.TeacherHub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
  name = "professor_subject",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"id"}),
  }
)
public class TeacherSubject {
  @Id
  @Column(name = "id", columnDefinition = "varchar(36)")
  String id;

  @ManyToOne
  @JoinColumn(name = "id_professor")
  Teacher teacher;

  @ManyToOne
  @JoinColumn(name = "id_subject")
  Subject subject;

}
