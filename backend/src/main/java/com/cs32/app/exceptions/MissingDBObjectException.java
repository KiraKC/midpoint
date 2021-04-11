package com.cs32.app.exceptions;

/**
 * MissingDBObjectException raised when something to look for is not
 * present in our MongoDB database.
 */
public class MissingDBObjectException extends Exception {
  public MissingDBObjectException(String objectType, String queriedField, String queriedValue,
                                  String collectionName) {
    super("ERROR: " + objectType + " with " + queriedField + "= " + queriedValue
        + " was not found in mongoDB "
        + collectionName + " collection");
  }
}
