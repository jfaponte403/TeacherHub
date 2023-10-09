package com.TOTeams.TeacherHub.User;

public enum Role {
  ADMIN(1),
  USER(2);

  private final Integer value;

  Role(Integer value) { 
    this.value = value;
  }

  public Integer getValue() {
    return value;
  }

  public static Role fromValue(int value) {
    for (Role role : Role.values()) {
      if (role.value == value) return role;
    }

    throw new IllegalArgumentException("Invalid UserRole value: " + value);
  }

}
