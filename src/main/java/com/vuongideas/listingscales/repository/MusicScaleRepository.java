package com.vuongideas.listingscales.repository;

import com.vuongideas.listingscales.model.MusicScale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicScaleRepository extends JpaRepository<MusicScale, Long> {

}