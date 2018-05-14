package com.vuongideas.listingscales.util;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

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

            for (Element row : rows) {
                switch (state) {
                    case 0:
                    default:
                }
            }

		} catch (IOException e) {
			e.printStackTrace();
		}
        return Collections.emptyList();
    }

    private static boolean isToneRow(Element row) {
        return false;
    }

    private static boolean isScaleRow(Element row) {
        return false;
    }

    private static int getTonesFromRow(Element row) {
        return 0;
    }

    public static MusicScale getScaleFromRow(Element row, int tones) {
        return null;
    }
}