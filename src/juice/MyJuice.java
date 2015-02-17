package juice;

import java.util.ArrayList;

/**
 * Created by Анастасия on 16.02.2015.
 */
public class MyJuice {
    private ArrayList<String> juice;
    public MyJuice(ArrayList<String> juice){
        this.juice = juice;
    }

    public ArrayList<String> getJuice() {
        return juice;
    }

    public void setJuice(ArrayList<String> juice) {
        this.juice = juice;
    }
}
