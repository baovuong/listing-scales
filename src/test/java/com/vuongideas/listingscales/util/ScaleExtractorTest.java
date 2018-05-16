package com.vuongideas.listingscales.util;

import java.util.Collection;

import com.vuongideas.listingscales.model.MusicScale;

import org.junit.Test;

public class ScaleExtractorTest {

    @Test 
    public void full() {
        Collection<MusicScale> scales = ScaleExtractor.extractScales();
    }
}