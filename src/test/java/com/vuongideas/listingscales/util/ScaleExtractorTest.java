package com.vuongideas.listingscales.util;

import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.Collection;

import com.vuongideas.listingscales.model.MusicScale;

import org.junit.Test;

public class ScaleExtractorTest {

    @Test 
    public void full() {
        Collection<MusicScale> scales = ScaleExtractor.extractScales();

        MusicScale scale1 = new MusicScale();
        scale1.setRoot(0);
        scale1.setIntervals(Arrays.asList(1, 2, 2, 1, 2, 2, 2));
        scale1.setNames(Arrays.asList(
            "G.Mixolydian", "G.Hyperdorian", "M.Hypophrygian", 
            "M.Locrian", "G.M.Hyperaeolian", "Rut biscale descending", 
            "Pien chih: China", "Makam Lami", "Yishtabach: Jewish"));
        
        MusicScale scale2 = new MusicScale();
        scale2.setRoot(5);
        scale2.setIntervals(Arrays.asList(1,1,2,1,2));
        scale2.setNames(Arrays.asList("Nyorog handap", "Baro"));

        MusicScale scale3 = new MusicScale();
        scale3.setRoot(0);
        scale3.setIntervals(Arrays.asList(1, 5));
        scale3.setNames(Arrays.asList("Vietnamese ditonic"));

        MusicScale scale4 = new MusicScale();
        scale4.setRoot(0);
        scale4.setIntervals(Arrays.asList(31, 27, 31, 27, 31, 31, 27));
        scale4.setNames(Arrays.asList("Amity-7"));

        assertTrue(scales.contains(scale1));
        assertTrue(scales.contains(scale2));
        assertTrue(scales.contains(scale3));
        assertTrue(scales.contains(scale4));
    }
}