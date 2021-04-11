package com.cs32.app.exceptions;

public class FailedDBWriteException extends Exception {
  public FailedDBWriteException(String objectType, String writeActionType, String collectionName) {
    super("ERROR: failed to " + writeActionType + objectType + " from " + collectionName + " collection");
  }
}
