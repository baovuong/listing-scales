package com.vuongideas.listingscales.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.vuongideas.listingscales.model.MusicScale;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ScaleExtractor {

    private static String intervalsPattern = "(\\[(?<root>[0-9]+)\\])? ?(?<intervals>([0-9] ?)+)";

    public static Collection<MusicScale> extractScales() {
        try {
            Document doc = Jsoup.connect("http://www.huygens-fokker.org/docs/modename.html")
                .userAgent("Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6")
                .referrer("http://www.google.com")
                .get();
            
            return doc.getElementsByTag("tr").stream()
                .map(r -> isScaleRow(r) ? getScaleFromRow(r) : null)
                .filter(r -> r != null)
                .collect(Collectors.toList());

		} catch (IOException e) {
			e.printStackTrace();
		}
        return Collections.emptyList();
    }

    private static boolean isScaleRow(Element row) {
        Elements columns = row.getElementsByTag("td");
        return columns.size() == 2
            && columns.stream() 
                .filter(e -> Pattern.matches(intervalsPattern, e.text()))
                .count() == 1;
    }

    public static MusicScale getScaleFromRow(Element row) {
        MusicScale scale = new MusicScale();

        Elements columns = row.getElementsByTag("td");
        Matcher intervalMatcher = Pattern.compile(intervalsPattern).matcher(columns.get(0).text());
        intervalMatcher.matches();
        
        // intervals
        scale.setIntervals(Arrays.stream(intervalMatcher.group("intervals").split(" "))
            .map(s -> Integer.parseInt(s))
            .collect(Collectors.toList()));

        // root 
        try {
            scale.setRoot(Integer.parseInt(intervalMatcher.group("root")));
        } catch (IllegalArgumentException e) {
            scale.setRoot(0);
        }

        // names
        scale.setNames(Arrays.stream(columns.get(1).text().split(","))
            .map(String::trim)
            .collect(Collectors.toList()));

        return scale;
    }
}