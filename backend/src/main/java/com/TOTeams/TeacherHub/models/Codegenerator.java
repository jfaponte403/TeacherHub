package com.TOTeams.TeacherHub.models;

import java.security.SecureRandom;

public class Codegenerator {
    public String generateCode() {
        String characters = "0123456789";

        SecureRandom random = new SecureRandom();

        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            code.append(characters.charAt(index));
        }

        return code.toString();
    }

    public boolean verifyCode(String code){

      return false;
    };

}
