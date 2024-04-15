package com.ltp.videogamerecords.web;


import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ltp.videogamerecords.entity.Roman;
import com.ltp.videogamerecords.service.RomanService;
import lombok.AllArgsConstructor;

//important annotation in order to send and recieve database values
@CrossOrigin(origins = "*")
//annnotation in order to declare this class as a controller
@RestController
//make it so that all of the endpoint start with /roman
@RequestMapping("/roman")
//makes a all argument contructor
@AllArgsConstructor
public class RomanController {

    RomanService romanService;

    //gets all values of the table
    @GetMapping("/int")
    public ResponseEntity<List<Roman>> getAllRomanValues(){
        return new ResponseEntity<>(romanService.getAllRoman(),HttpStatus.OK);
    }
    


    //post roman inserted value.
    @PostMapping
    public ResponseEntity<Roman> saveRoman(@RequestBody Roman roman){
        return new ResponseEntity<>(romanService.save(roman), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Roman> getRoman(@PathVariable long id){
        return new ResponseEntity<>(romanService.getRomanValue(id),HttpStatus.OK);
    }



    @PutMapping("/{id}/update")
    public ResponseEntity<Roman> updateRoman(@PathVariable long id, @RequestBody Roman roman){
        return new ResponseEntity<>(romanService.update(id,roman), HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<HttpStatus> delete(@PathVariable long id){
        romanService.deleteRoman(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        
    }



}
