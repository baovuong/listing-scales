package com.vuongideas.listingscales.dao;

import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;

public interface MusicScaleDAO {
    public void addMusicScale(MusicScale scale);
    public void updateMusicScale(MusicScale scale);
    public List<MusicScale> listMusicScales();
    public MusicScale getMusicScaleById(int id);
    public void removeMusicScale(int id);
}