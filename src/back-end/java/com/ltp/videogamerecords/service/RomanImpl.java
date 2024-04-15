package com.ltp.videogamerecords.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Service;
import com.ltp.videogamerecords.entity.Roman;
import com.ltp.videogamerecords.repository.RomanRepository;
import lombok.AllArgsConstructor;


//important annotation in order to declare this class a service
@Service
//annotation in order to have a all argument constructor
@AllArgsConstructor


public class RomanImpl implements RomanService {
    

    RomanRepository romanRepository;


    //converts roman string into a number 
    @Override
    public int romanToInt(String str) {
        //maps every roman value with a number
        Map<Character,Integer> roman = new HashMap<>();
            roman.put('I',1);
            roman.put('V',5);
            roman.put('X',10);
            roman.put('L', 50);
            roman.put('C',100);
            roman.put('D',500);
            roman.put('M',1000);

            //converts string into a char array
            char[] charRome = str.toCharArray();
            //int array in order to put the converted string
            int[] intRome = new int[charRome.length];

            //loops the char array in order to fill int array with numbers
            //getting the hash map predetermine value
            for(int i = 0; i < intRome.length; i++)
                intRome[i] = roman.get(charRome[i]);


            //counter in order to sum the int array.
            int sum = 0;

            //loops the int array in order to sum each value.
            for(int i = 0; i < intRome.length; i++){

                //checks if where at the end of the array
                if(i == intRome.length-1){
                    sum+= intRome[i];
                }
                //sum the value if the value is larger than the next vlue
                else if(intRome[i] >= intRome[i+1]) 
                    sum+= intRome[i];
                //substract the value if the value is less than the next value;
                else sum-= intRome[i];
        }

        return sum;

    }

    //saves value but first converts them to integer.
    @Override
    public Roman save(Roman roman) {
        roman.setConversion(romanToInt(roman.getRoman()));
        romanRepository.save(roman);
        return roman;
    }

    //display a list of all roman numbers converted to integers
    @Override
    public List<Roman> getAllRoman() {
        return (List<Roman>)romanRepository.findAll();
    }
    

    //updates the numbers if the user chooses to
    public Roman update(long id,Roman roman){
        
        if(romanRepository.findById(id).isPresent()){

            Roman r = new Roman();
            r.setId(id);
            r.setRoman(roman.getRoman());
        return save(r);
        }

        return null;
    }

    //gets the 
    public Roman getRomanValue(long id){
        return romanRepository.findById(id).get();
    }

    public void deleteRoman(long id){
        romanRepository.deleteById(id);
    }


    
}
