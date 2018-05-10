package com.vuongideas.listingscales.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="MusicScale")
public class MusicScale {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String intervals;

    private int tones;
    
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

    public String getIntervals() {
        return intervals;
    }

    public int getRoot() {
        return root;
    }
}