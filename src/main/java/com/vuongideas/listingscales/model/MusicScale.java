package com.vuongideas.listingscales.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.vuongideas.listingscales.util.StringListConverter;

@Entity
@Table(name="MusicScale")
public class MusicScale {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column
    @Convert(converter = StringListConverter.class)
    private List<String> intervals;

    @Column
    private int tones;
    
    @Column
    private int root;
    
    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<String> names;


    public Long getId() {
        return id;
    }

    public List<String> getNames() {
        return names;
    }

    public int getTones() {
        return tones;
    }

    public List<String> getIntervals() {
        return intervals;
    }

    public int getRoot() {
        return root;
    }
}