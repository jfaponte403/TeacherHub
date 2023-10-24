package com.TOTeams.TeacherHub.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class AuthCodes {
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
}
