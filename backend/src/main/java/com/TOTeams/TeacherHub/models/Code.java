package com.TOTeams.TeacherHub.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Time;

@Entity
@Table(name = "auth_code")
public class Code {
    @Id
    @Column(name = "id_student")
    private String id_student;
    @Column(name = "date_time")
    private Time date_time;
    @Column(name = "code")
    private String code;

    public Code() {
    }

    public String getId_student() {
        return id_student;
    }

    public void setId_student(String id_student) {
        this.id_student = id_student;
    }

    public Time getDate_time() {
        return date_time;
    }

    public void setDate_time(Time date_time) {
        this.date_time = date_time;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
