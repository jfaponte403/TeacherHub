package com.TOTeams.TeacherHub.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
  name = "student", 
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name"}),
    @UniqueConstraint(columnNames = {"id_subject"})
  }
)
public class Subject {
    @Id
    @Column(name = "id_subject", columnDefinition = "varchar(36)")
    String id;
  
    @Column(name = "name", nullable = false)
    String name;
  

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
