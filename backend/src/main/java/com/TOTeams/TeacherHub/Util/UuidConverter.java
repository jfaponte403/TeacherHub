package com.TOTeams.TeacherHub.util;

import java.nio.ByteBuffer;
import java.util.UUID;

public class UuidConverter {
  public static UUID convertToUUID(byte[] bytes) {
    ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
    long high = byteBuffer.getLong();
    long low = byteBuffer.getLong();
    return new UUID(high, low);
  }
}
