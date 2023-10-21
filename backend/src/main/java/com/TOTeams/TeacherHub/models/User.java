package com.TOTeams.TeacherHub.models;

import java.util.Collection;
import java.util.List;

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
  
  @Column(nullable = false)
  Role id_role;

  @Column(name = "password", nullable = false)
  String password;

  @Column
  String hash;

  @Column(name = "is_active", nullable = false )
  boolean isActive;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(id_role.name()));
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public void setActive(boolean b) {
  }
}
