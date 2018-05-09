package com.vuongideas.listingscales.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ListingScalesController {

    @RequestMapping(value = "/thing", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public String thing() {
        return "thing!";
    }
}
