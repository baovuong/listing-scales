package com.vuongideas.listingscales.repository;

import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicScaleRepository extends JpaRepository<MusicScale, Long> {

    @Query(value = "SELECT music_scale.* FROM music_scale, scale_name " + 
            "WHERE music_scale.id = scale_name.music_scale_id AND scale_name.name LIKE %?1%",
        countQuery = "SELECT COUNT(music_scale.*) FROM music_scale, scale_name " +
            "WHERE music_scale.id = scale_name.music_scale_id AND scale_name.name LIKE %?1%",
        nativeQuery = true)
    List<MusicScale> findByName(String name);
}