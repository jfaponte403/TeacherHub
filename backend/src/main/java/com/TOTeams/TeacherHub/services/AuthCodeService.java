package com.TOTeams.TeacherHub.services;

import com.TOTeams.TeacherHub.util.AuthCodes;
import com.TOTeams.TeacherHub.util.EmailSender;
import com.TOTeams.TeacherHub.models.Code;
import com.TOTeams.TeacherHub.models.User;
import com.TOTeams.TeacherHub.repositories.CodeRepository;
import com.TOTeams.TeacherHub.repositories.UserRespository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthCodeService {
    @Autowired
    private final CodeRepository authCodeRepository;
    private final UserRespository userRespository;
    private final AuthCodes authCodes;
    private final EmailSender emailSender;
    private final PasswordEncoder passwordEncoder;


    public boolean registerCode(String studentId) {
        String code = authCodes.generateCode();
        Code authCode = Code.builder()
                .id_student(studentId)
                .code(code)
                .date_time(java.time.LocalDateTime.now())
                .build();
        try{
            authCodeRepository.deleteByIdStudent(studentId);
            authCodeRepository.save(authCode);
        } catch (DataIntegrityViolationException e) {
            throw e;
        }
        emailSender.sendEmail(
                userRespository.findById(studentId).get().getEmail(),
                "Verification code",
                "Your verification code is: " + code
        );


        return true;
    }


    @Transactional
    public boolean verifyCodeAndUpdateStatus(String studentId, String codeToVerify) {
        Optional<Code> authCode = authCodeRepository.findByIdStudent(studentId);
        if (authCode != null && authCode.get().getCode().equals(codeToVerify)) {
            User student = userRespository.findById(studentId).orElse(null);
            if (student != null) {
                student.setIs_active(true);
                return userRespository.activateUser(student.getId(), true) == 1;
            }
        }
        return false;
    }

    @Transactional
    public boolean verifyCodeAndUpdatePassword(String studentId, String codeToVerify, String newPassword) {
        Optional<Code> authCode = authCodeRepository.findByIdStudent(studentId);

        if (authCode != null && authCode.get().getCode().equals(codeToVerify)) {
            User student = userRespository.findById(studentId).orElse(null);
            if (student != null) {
                student.setPassword(passwordEncoder.encode(student.getHash() + newPassword));
                userRespository.save(student);
                return true;
            }
        }
        return false;
    }
}
