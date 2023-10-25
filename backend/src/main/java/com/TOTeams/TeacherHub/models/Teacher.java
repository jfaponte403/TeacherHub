package com.TOTeams.TeacherHub.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
