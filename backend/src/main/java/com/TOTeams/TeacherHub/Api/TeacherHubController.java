package com.TOTeams.TeacherHub.Api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/teacherhub/api")
@RequiredArgsConstructor
public class TeacherHubController {
  
  @GetMapping("welcome")
  public String welcome() {
    return "Welcome";
  }

}
