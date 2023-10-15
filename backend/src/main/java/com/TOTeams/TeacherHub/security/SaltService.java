package com.TOTeams.TeacherHub.security;

import org.springframework.stereotype.Component;

@Component
public class SaltService {

  public String generateSalt() {
      String theAlphaNumericS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      StringBuilder builder = new StringBuilder(16); 

      for (int m = 0; m < 16; m++) {
          int myindex = (int) (theAlphaNumericS.length() * Math.random()); 

          builder.append(theAlphaNumericS.charAt(myindex)); 
      } 

      return builder.toString(); 
    }
  
}
