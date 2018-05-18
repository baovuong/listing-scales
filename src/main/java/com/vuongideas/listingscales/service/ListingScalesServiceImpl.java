package com.vuongideas.listingscales.service;

import java.util.Collection;
import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.repository.MusicScaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListingScalesServiceImpl implements ListingScalesService {

    @Autowired
    private MusicScaleRepository repository;

	@Override
	public List<MusicScale> getAllScales() {
		return repository.findAll();
	}

	@Override
	public void addScales(Collection<MusicScale> scales) {
		repository.saveAll(scales);
	}

}