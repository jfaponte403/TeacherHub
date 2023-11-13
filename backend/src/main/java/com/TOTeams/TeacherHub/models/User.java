package com.TOTeams.TeacherHub.models;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
    @UniqueConstraint(columnNames = {"email"}),
    @UniqueConstraint(columnNames = {"first_name"}),
    @UniqueConstraint(columnNames = {"id_student"})
  }
)
public class User implements UserDetails {
  @Id
  @Column(name = "id_student", nullable = false, updatable = false, columnDefinition = "VARCHAR(36)")
  String id;
  
  @Column(name = "first_name", nullable = false)
  String nickname;
  
  @Column(nullable = false)
  String email;
  
  @Column(name = "id_role", nullable = false)
  @JsonBackReference
  Role role;

  @Column(name = "password", nullable = false)
  String password;

  @Column
  @JsonBackReference
  String hash;

  @Column(name = "is_active", nullable = false )
  @JsonBackReference
  Boolean active;

  @Override
  @JsonBackReference
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
  }

  @Override
  @JsonBackReference
  public String getPassword() {
    return this.password;
  }

  @Override
  @JsonBackReference
  public String getUsername() {
    return this.email;
  }

  @Override
  @JsonBackReference
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  @JsonBackReference
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  @JsonBackReference
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  @JsonBackReference
  public boolean isEnabled() {
    return true;
  }
}
