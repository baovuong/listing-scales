package com.vuongideas.listingscales.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vuongideas.listingscales.exception.NotFoundException;
import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.repository.MusicScaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class ListingScalesController {

    @Autowired
    MusicScaleRepository repository;

    @RequestMapping(value = "/scales", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public List<MusicScale> allScales(
        @RequestParam(name = "q", required = false) String name,
        @RequestParam(name = "tones", required = false) Integer tones) {

        List<MusicScale> results = Optional.ofNullable(name)
            .map(n -> repository.findByName(n))
            .orElse(repository.findAll());
        
        return Optional.ofNullable(tones)
            .map(t -> results.stream()
                .filter(s -> new Integer(s.getTones()).equals(t))
                .collect(Collectors.toList()))
            .orElse(results);
    }

    @RequestMapping(value = "/scales/{id}", method = RequestMethod.GET)
    public MusicScale scaleById(@PathVariable long id) throws NotFoundException {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException(String.format("scale of id %d does not exist.", id)));
    }
}
