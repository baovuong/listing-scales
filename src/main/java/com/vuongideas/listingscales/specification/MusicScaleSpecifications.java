package com.vuongideas.listingscales.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.vuongideas.listingscales.model.MusicScale;
import com.vuongideas.listingscales.model.MusicScale_;

import org.springframework.data.jpa.domain.Specification;

public class MusicScaleSpecifications {
    public static Specification<MusicScale> hasTones(int tones) {
        return new Specification<MusicScale>() {

			@Override
			public Predicate toPredicate(Root<MusicScale> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(MusicScale_.tones), tones);
			}
        };
    }
}