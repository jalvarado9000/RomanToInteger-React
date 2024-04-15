package com.ltp.videogamerecords.service;

import java.util.List;

import com.ltp.videogamerecords.entity.Roman;

public interface RomanService {
    
    //converts roman to integer
    int romanToInt(String str);
    //saves values
    Roman save(Roman roman);
    //displays all values
    List<Roman> getAllRoman();
    Roman update(long id, Roman roman);

    Roman getRomanValue(long id);
    void deleteRoman(long id);
    
    
}
