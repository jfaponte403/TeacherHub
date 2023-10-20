package com.TOTeams.TeacherHub.models;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmail{

    @Autowired
    private JavaMailSender javaMailSender;

    //////////////////////////
    public void sendEmails(String email){
        Codegenerator cod = new Codegenerator();
        String codigo = cod.generateCode();
        enviarCorreo(email, "SU CODIGO DE VERIFICACION ES: "+codigo);
    }
    //////////////////////////

    private void enviarCorreo(String destino, String mensaje) {
        SimpleMailMessage correo = new SimpleMailMessage();
        correo.setTo(destino);
        correo.setSubject("CODIGO DE VERIFICACION");
        correo.setText(mensaje);
        javaMailSender.send(correo);
    }

}// final


