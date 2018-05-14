package com.vuongideas.listingscales.util;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import com.vuongideas.listingscales.model.MusicScale;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class ScaleExtractor {
    public static Collection<MusicScale> extractScales(String content) {
        try {
            Document doc = Jsoup.connect("http://www.huygens-fokker.org/docs/modename.html")
                .userAgent("Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6")
                .referrer("http://www.google.com")
                .get();
            
            Elements rows = doc.getElementsByTag("tr");

		} catch (IOException e) {
			e.printStackTrace();
		}
        return Collections.emptyList();
    }
}