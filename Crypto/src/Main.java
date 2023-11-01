import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class Main {
    public static String encryptPassword(String password, byte[] someSalt){
        String generatedPassword = null;
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(someSalt);
            byte[] bytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for(int i = 0; i < bytes.length; i++){
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        }catch(NoSuchAlgorithmException e){
            System.out.println("Error de encriptación: " + e.getMessage());
        }
        return generatedPassword;
    }

    public static void main(String[] args) {
        System.out.println(encryptPassword("4209", "aSrQe165Z!a-w_qs".getBytes()));
        if(encryptPassword(
                "4209",
                "aSrQe165Z!a-w_qs".getBytes())
                .equals("c91d34234d6f27b926da7563a3720247a88ac492dc44309e7943dbe768180dad106040f37ac9f8209e510706f5e04acb78cdf029abcbd302262fec0357c29306"))
            System.out.println("Contraseña correcta");
        else
            System.out.println("Contraseña incorrecta");
    }
}



    private Connector() {
        try{

            String host = "direccion_base_datos ej: localhost";
            String port = "puerto base de datos, ej: 3306";
            String username = "usuario bd ej: root";
            String password = "contraseña bd ej: 1234";
            String name = "nombre bd ej: db";
            String dbURL = "jdbc:mysql://"+host+":"+port+"/" + name;
            System.out.println("dbURL = " + dbURL);
            System.out.println("username + password = " + username + password);
            Class.forName("com.mysql.cj.jdbc.Driver");
            cnn = DriverManager.getConnection(dbURL, username, password);
        } catch( SQLException | FileNotFoundException ex ) {
            ex.printStackTrace();
        } catch (IOException | ParseException ex) {
            ex.printStackTrace();
        } catch (ClassNotFoundException ex) {
            System.out.println("error en driver bd " + ex.getMessage());
        }
    }