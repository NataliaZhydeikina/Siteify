package com.siteify;
import android.annotation.SuppressLint;
import android.os.AsyncTask;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.lang.ref.WeakReference;


public class SiteModule extends ReactContextBaseJavaModule {
    private Callback callback = null;
    SiteModule(ReactApplicationContext context) {
        super(context);
    }

    @SuppressLint("StaticFieldLeak")
    @ReactMethod
    public void request(String url, Callback callBack) {
        callback = callBack;
        new Request(this).execute(url);
    }

    @NonNull
    @Override
    public String getName() {
        return "SiteModule";
    }

    private static class Request extends AsyncTask<String, Void, Void> {
        final String[] title = {""};
        private WeakReference<SiteModule> activityReference;

        Request(SiteModule context) {
            activityReference = new WeakReference<>(context);
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).get();
                title[0] = doc.title();
                System.out.println(title[0]);
            }
            catch(Exception e) {
                title[0] = "Error";
            }
            return null;
        }

        protected void onPostExecute(Void dummy) {
            SiteModule activity = activityReference.get();
            if (activity == null || activity.callback == null) return;
            activity.callback.invoke(title[0]);
        }
    }
}