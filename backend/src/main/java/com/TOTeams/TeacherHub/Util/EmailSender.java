package com.TOTeams.TeacherHub.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class EmailSender {
    @Autowired
    private final JavaMailSender javaMailSender;

    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String emailAdress, String subject, String body){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(emailAdress);
        mail.setSubject(subject);
        mail.setText(body);
        javaMailSender.send(mail);
    }
}