package com.TOTeams.TeacherHub.Util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * @author FaihdP
 * 
 * Generic response for requests.
 * When this is returned in a request spring boot become the map to JSON object. 
 * 
 * @param HttpStatus status
 * @param String path
 * @param String message
 */
@Component
public class ResponseHandler {
  
  public static ResponseEntity<Object> generateResponse(HttpStatus status, String path, String message) {
    Map<String, Object> response = new HashMap<String, Object>();

    response.put("status", status.value());
    response.put("error", status.getReasonPhrase());
    response.put("path", path);
    response.put("message", message);    

    return new ResponseEntity<Object>(response, status);
  }

}
