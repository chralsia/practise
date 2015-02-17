package juice;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;

/**
 * Created by Анастасия on 16.02.2015.
 */
public class MyThread implements Runnable {
    private ArrayList<String> components;
    public MyThread(ArrayList<String> components){
        this.components = components;
    }
    @Override
    public void run(){
        Collections.sort(components, new MyClass.ComparatorByCode());
        try {
            FileWriter fileWriter2 = new FileWriter("juice2.out");
            PrintWriter printWriter2 = new PrintWriter(new BufferedWriter(fileWriter2));
            Iterator<String> j = components.iterator();
            while (j.hasNext()) {
                String str = j.next();
                printWriter2.println(str);
                printWriter2.flush();
            }
        }
        catch (IOException e){
            System.err.println("Error!");
        }
    }
}
