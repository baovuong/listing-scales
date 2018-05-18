package com.vuongideas.listingscales.service;

import java.util.Collection;
import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;

public interface ListingScalesService {
    public List<MusicScale> getAllScales();
    public void addScales(Collection<MusicScale> scales);
}