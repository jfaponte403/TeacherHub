package com.TOTeams.TeacherHub.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "professor",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id"}),
    }
)
public class Teacher {
    @Id
    @Column(name = "id", columnDefinition = "varchar(36)")
    String id;

    @Column(name = "name", nullable = false)
    String name;

    @ManyToMany
    @JsonBackReference
    @JoinTable(
        name = "professor_subject",
        joinColumns = @JoinColumn(name = "id_professor", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "id_subject", referencedColumnName = "id_subject")
    )
    List<Subject> subjects = new ArrayList<>();
}
