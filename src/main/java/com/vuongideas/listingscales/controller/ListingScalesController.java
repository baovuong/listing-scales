package com.vuongideas.listingscales.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.repository.MusicScaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ListingScalesController {

    @Autowired
    MusicScaleRepository repository;

    @RequestMapping(value = "/scales", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public List<MusicScale> allScales(@RequestParam(name = "q", required = false) String name) {
        if (name == null)
            return repository.findAll();


        // TODO this isn't too efficient. O(n^2) search.
        return repository.findAll().stream()
            .filter(s -> s.getNames().stream()
                .filter(n -> n.toLowerCase().contains(name.toLowerCase()))
                .count() > 0)
            .collect(Collectors.toList());
    }
}
