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
    public static Collection<MusicScale> extractScales(String content) {
        try {
            Document doc = Jsoup.connect("http://www.huygens-fokker.org/docs/modename.html")
                .userAgent("Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6")
                .referrer("http://www.google.com")
                .get();
            
            Elements rows = doc.getElementsByTag("tr");
            int state = 0;
            Collection<MusicScale> scales = new ArrayList<>();
            for (Element row : rows) {
                int tones = 0;
                switch (state) {
                    case 0:
                    if (isScaleRow(row)) {
                        state = 1;
                    } else {
                        tones = getTonesFromRow(row);
                    }
                    case 1:
                    if (isToneRow(row)) {
                        state = 0;
                    } else {
                        scales.add(getScaleFromRow(row, tones));
                    }
                    default:
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
            .filter(e -> Pattern.compile("[0-9]+ [tT]ones").matcher(e.text()).find())
            .count() > 0;
    }

    private static boolean isScaleRow(Element row) {
        return row.getElementsByTag("td").size() == 2 
            && row.getElementsByTag("td").stream()
                .filter(e -> Pattern.matches("\\[?[1-9]\\]? ?([1-9] ?)*", e.text()))
                .count() == 1;
    }

    private static int getTonesFromRow(Element row) {
        return 0;
    }

    public static MusicScale getScaleFromRow(Element row, int tones) {
        return null;
    }
}