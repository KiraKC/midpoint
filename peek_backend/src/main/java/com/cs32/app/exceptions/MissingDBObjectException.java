package com.cs32.app.exceptions;

public class MissingDBObjectException extends Exception {
  public MissingDBObjectException(String objectType, String queriedField, String queriedValue, String collectionName) {
    super("ERROR: " + objectType + " with " + queriedField + "= " + queriedValue + " was not found in mongoDB " + collectionName + " collection");
  }
}
