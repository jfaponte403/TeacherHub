package com.TOTeams.TeacherHub.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.TOTeams.TeacherHub.Jwt.JwtAuthentificationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthentificationFilter jwtAuthenticationFilter;
  private final AuthenticationProvider authProvider;

  /**
   * @author FaihdP
   * 
   * Configuration for web security, all request for "/auth/**" for any user are allowed.
   * For rest of endpoints is necesary an authentification with JWT token
   * 
   * @param HttpSecurty http 
   * 
   * @disabled CSRF (Coss-Site Request Forgery) is disabled because is used JWT tokens
   */
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return 
      http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authRequest -> 
          authRequest
            .requestMatchers("/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .sessionManagement(sessionManager -> sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        /*.exceptionHandling(exceptionHandling -> 
          exceptionHandling
            .authenticationEntryPoint(
              (request, response, authException) -> {
                response.sendRedirect("/unauthorized");
              }
            )
        )*/
        .build();
        
  }

}
