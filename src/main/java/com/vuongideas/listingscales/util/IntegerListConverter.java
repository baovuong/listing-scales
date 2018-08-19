package com.vuongideas.listingscales.util;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class IntegerListConverter implements AttributeConverter<List<Integer>, String> {

	@Override
	public String convertToDatabaseColumn(List<Integer> attribute) {
		return attribute.stream()
			.map(Object::toString)
			.collect(Collectors.joining(","));
	}

	@Override
	public List<Integer> convertToEntityAttribute(String dbData) {
		return Arrays.stream(dbData.split(","))
			.map(s -> Integer.parseInt(s))
			.collect(Collectors.toList());
	}

}