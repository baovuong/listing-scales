package com.vuongideas.listingscales.gen;

import static org.junit.Assert.assertTrue;

import java.util.Collection;

import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.repository.MusicScaleRepository;
import com.vuongideas.listingscales.util.ScaleExtractor;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(properties = {"spring.jpa.hibernate.ddl-auto="})
public class DataGenerationTest {
    
    @Autowired
    MusicScaleRepository repository;

    @Test
    public void populateDatabase() {
        Collection<MusicScale> scales = ScaleExtractor.extractScales();
        long failures = 0;
        repository.deleteAll();
        for (MusicScale scale : scales) {
            System.out.println("adding: " + scale);
            failures += repository.save(scale) == null ?  1 : 0;
        }
        assertTrue(failures == 0);
    }
}