package com.vuongideas.listingscales.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.vuongideas.listingscales.model.MusicScale;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ScaleExtractor {

    private static String tonesPattern = "(?<tones>[0-9]+) [tT]one.*:";
    private static String intervalsPattern = "(\\[(?<root>[0-9]+)\\])? ?(?<intervals>([0-9] ?)+)";

    public static Collection<MusicScale> extractScales() {
        try {
            Document doc = Jsoup.connect("http://www.huygens-fokker.org/docs/modename.html")
                .userAgent("Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6")
                .referrer("http://www.google.com")
                .get();
            
            Elements rows = doc.getElementsByTag("tr");
            int tones = 12;
            Collection<MusicScale> scales = new ArrayList<>();
            for (Element row : rows) {
                if (isToneRow(row)) {
                    tones = getTonesFromRow(row);
                } else if (isScaleRow(row)) {
                    scales.add(getScaleFromRow(row, tones));
                }
            }

            return scales;

		} catch (IOException e) {
			e.printStackTrace();
		}
        return Collections.emptyList();
    }

    private static boolean isToneRow(Element row) {
        return row.getElementsByTag("h4").stream()
            .filter(e -> Pattern.matches(tonesPattern, e.text()))
            .count() > 0;
    }

    private static boolean isScaleRow(Element row) {
        Elements columns = row.getElementsByTag("td");
        return columns.size() == 2
            && columns.stream() 
                .filter(e -> Pattern.matches(intervalsPattern, e.text()))
                .count() == 1;
    }

    private static int getTonesFromRow(Element row) {
        Element column = row.getElementsByTag("td").first();
        Matcher matcher = Pattern.compile(tonesPattern).matcher(column.text());
        return Integer.parseInt(matcher.group("tones"));
    }

    public static MusicScale getScaleFromRow(Element row, int tones) {
        MusicScale scale = new MusicScale();
        scale.setTones(tones);

        Elements columns = row.getElementsByTag("td");
        Matcher intervalMatcher = Pattern.compile(intervalsPattern).matcher(columns.get(0).text());
        List<Integer> intervals = Arrays.stream(intervalMatcher.group("intervals").split(" "))
            .map(s -> Integer.parseInt(s))
            .collect(Collectors.toList());
        scale.setIntervals(intervals);


        return scale;
    }
}