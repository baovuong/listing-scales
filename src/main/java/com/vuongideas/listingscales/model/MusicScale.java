package com.vuongideas.listingscales.model;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import com.vuongideas.listingscales.util.IntegerListConverter;

@Entity
@JacksonXmlRootElement(localName="music-scale")
public class MusicScale {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column
    @Convert(converter = IntegerListConverter.class)
    @JacksonXmlElementWrapper(localName = "intervals")
    @JacksonXmlProperty(localName = "interval")
    private List<Integer> intervals;

    @Column
    private int tones;
    
    @Column
    private int root;
    
    @ElementCollection
    @CollectionTable(name="ScaleName", joinColumns=@JoinColumn(name="musicScaleId"))
    @Column(name="name")
    @JacksonXmlElementWrapper(localName = "names")
    @JacksonXmlProperty(localName = "name")
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

    public List<Integer> getIntervals() {
        return intervals;
    }

    public int getRoot() {
        return root;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public void setIntervals(List<Integer> intervals) {
        this.intervals = intervals;
        this.tones = intervals.stream().mapToInt(Integer::intValue).sum();
    }

    public void setRoot(int root) {
        this.root = root;
    }

    @Override
    public String toString() {
        return "(scale: "
            + "tones=" + tones + ","
            + "root=" + root + ","
            + "intervals=" + intervals.toString() + ","
            + "names=" + names.toString()
            + ")";
    }

    @Override
    public boolean equals(Object other) {
        if (other instanceof MusicScale) {
            MusicScale otherScale = (MusicScale) other;
            return tones == otherScale.tones
                && root == otherScale.root
                && intervals.equals(otherScale.intervals)
                && names.equals(otherScale.names);
        }
        return false;
    }


}