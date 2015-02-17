package juice;

import java.io.*;
import java.util.*;

/**
 * Created by Анастасия on 16.02.2015.
 */
public class MyClass {
    public static class ComparatorByCode implements Comparator<String> {
        public int compare(String ob1, String ob2){
            return ob1.compareTo(ob2);
        }
    }
    public static class ComparatorBySize implements Comparator<MyJuice> {
        public int compare(MyJuice ob1, MyJuice ob2){
            if(ob1.getJuice().size() > ob2.getJuice().size())
                return 1;
            if(ob1.getJuice().size() < ob2.getJuice().size())
                return -1;
            return 0;
        }
    }


    public static boolean check(String str, ArrayList<String> al){
        for (int i = 0; i < al.size(); i++) {
            if(al.get(i).equals(str)){
                return false;
            }
        }
        return true;
    }

    public static void clean(ArrayList<MyJuice> copyJuices,MyJuice juice){
        copyJuices.remove(juice);
        for (int i = 0; i < copyJuices.size(); i++) {
            if(copyJuices.get(i).getJuice().containsAll(juice.getJuice())){
                MyJuice tmp = copyJuices.get(i);
                clean(copyJuices,tmp);
            }
        }
    }
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(new File("juice.in"));
            ArrayList<MyJuice> juices = new ArrayList<MyJuice>();
            while(sc.hasNextLine()){
                String line = sc.nextLine();
                StringTokenizer stringTokenizer = new StringTokenizer(line);
                ArrayList<String> tmp = new ArrayList<String>();
                while(stringTokenizer.hasMoreTokens()){
                    String str = stringTokenizer.nextToken();
                    tmp.add(str);
                }
                juices.add(new MyJuice(tmp));
            }


            Iterator<MyJuice> i = juices.iterator();
            while(i.hasNext()){
                ArrayList<String> tmp = i.next().getJuice();
                System.out.println(tmp);
            }

            ArrayList<String> components = new ArrayList<String>();
            i = juices.iterator();
            while(i.hasNext()){
                ArrayList<String> tmp = i.next().getJuice();
                for (int j = 0; j < tmp.size(); j++) {
                    if(check(tmp.get(j),components)){
                        components.add(tmp.get(j));
                    }
                }
            }
            FileWriter fileWriter1 = new FileWriter("juice1.out");
            PrintWriter printWriter1 = new PrintWriter(new BufferedWriter(fileWriter1));
            Iterator<String> j = components.iterator();
            while(j.hasNext()) {
                String str = j.next();
                printWriter1.println(str);
                printWriter1.flush();
            }

            System.out.println(components);

            Thread mySort = new Thread(new MyThread(components));
            mySort.start();

            ArrayList<MyJuice> copyJuices = new ArrayList<MyJuice>();
            copyJuices.addAll(juices);
            Collections.sort(copyJuices,new ComparatorBySize());
            i = copyJuices.iterator();
            while(i.hasNext()){
                ArrayList<String> tmp = i.next().getJuice();
                System.out.println(tmp);
            }

            int counter = 0;

            while(!copyJuices.isEmpty()){
                MyJuice juice = copyJuices.get(0);
                clean(copyJuices,juice);
                counter++;
            }

            FileWriter fileWriter3 = new FileWriter("juice3.out");
            PrintWriter printWriter3 = new PrintWriter(new BufferedWriter(fileWriter3));
            printWriter3.print(counter);
            printWriter3.flush();
        }
        catch (FileNotFoundException e){
            System.err.println("File is not found!");
        }
        catch (IOException e){
            System.err.println("ERROR!");
        }
    }
}
