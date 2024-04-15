package com.ltp.videogamerecords.repository;

import org.springframework.data.repository.CrudRepository;

import com.ltp.videogamerecords.entity.Roman;

//interface in order to use the crudRepository methods built in.
public interface RomanRepository extends CrudRepository<Roman,Long> {
    
}
