package com.cs32.app;

import java.net.UnknownHostException;

/**
 * Hello world!
 *
 */
public class App {

    public static void main( String[] args ) {
        try {
            new Main(args).run();
        } catch (Exception e) {
            System.out.println(e);
            System.exit(-1);
        }
    }

}