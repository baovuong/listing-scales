package com.vuongideas.listingscales.dao;

import java.util.List;

import com.vuongideas.listingscales.model.MusicScale;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class MusicScaleDAOImpl implements MusicScaleDAO {
    
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

	@Override
	public void addMusicScale(MusicScale scale) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(scale);
	}

	@Override
	public void updateMusicScale(MusicScale scale) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(scale);
    }
    
    @SuppressWarnings("unchecked")
	@Override
	public List<MusicScale> listMusicScales() {
        Session session = this.sessionFactory.getCurrentSession();
        List<MusicScale> scales = session.createQuery("from MusicScale").list();
        return scales;
	}

	@Override
	public MusicScale getMusicScaleById(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        MusicScale scale = (MusicScale) session.load(MusicScale.class, new Integer(id));
        return scale;
	}

	@Override
	public void removeMusicScale(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        MusicScale scale = (MusicScale) session.load(MusicScale.class, new Integer(id));
        if (null != scale) {
            session.delete(scale);
        }
	}

}