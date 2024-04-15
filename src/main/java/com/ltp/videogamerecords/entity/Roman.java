package com.ltp.videogamerecords.entity;

import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Annotation to not write getter,setter etc.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//important annotation in order to declare this class as Entity
@Entity

//name of the table
@Table(name = "roman")
public class Roman {

public Roman(Optional<Roman> findById) {
    }
//generates once the object is created
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)

//values of the database
@Column(name = "id")
private long id;

@NotBlank
@Column(name = "roman")
private String roman;

@Min(value=0)
@Column(name = "conversion")
private int conversion;




}
