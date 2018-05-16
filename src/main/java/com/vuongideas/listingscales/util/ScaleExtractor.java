package com.vuongideas.listingscales.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.regex.Pattern;

import com.vuongideas.listingscales.model.MusicScale;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ScaleExtractor {

    private static String tonesPattern = "([0-9]+) [tT]ones";
    private static String intervalsPattern = "\\[([0-9]+)\\] ?([0-9]+ ?)*";

    public static Collection<MusicScale> extractScales(String content) {
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
            .filter(e -> Pattern.compile(tonesPattern).matcher(e.text()).find())
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
        
        return 0;
    }

    public static MusicScale getScaleFromRow(Element row, int tones) {
        return null;
    }
}