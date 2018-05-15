package com.vuongideas.listingscales.controller;

import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.repository.MusicScaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ListingScalesController {

    @Autowired
    MusicScaleRepository musicScaleRepository;

    @RequestMapping(value = "/scales", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public List<MusicScale> allScales() {
        return musicScaleRepository.findAll();
    }
}
