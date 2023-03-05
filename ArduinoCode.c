#include <Wire.h>
#include "Adafruit_TCS34725.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <esp_http_client.h>


const char* ssid = "Pixel";
const char* password = "testing1";


Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_300MS, TCS34725_GAIN_4X);

void setup(void) {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Connecting to WiFi....");
  }
  Serial.println(WiFi.localIP());
}

void loop() {

    if (WiFi.status() == WL_CONNECTED) {

      HTTPClient http;
      String rgbString;
      http.begin("https://localhost:3000/Posts");
      http.addHeader("Content-Type", "text/string");

      for(int i = 0; i<5 ; i++){
          float r,g,b;
          tcs.getRGB(&r,&g,&b);
          int R,G,B;
          R = round(r);
          G = round(g);
          B = round(b);
          rgbString = String(R)+","+String(G)+","+String(B);
          Serial.println(rgbString);
          delay(1000);
      }

      int httpResponseCode = http.POST(rgbString);

      if (httpResponseCode > 0) {

        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);
      }
      else {
        Serial.print("Data not Posted, Error code:");
        Serial.println(httpResponseCode);
      }

      http.end();
    }else{
      Serial.println("WiFi not connected");
    }
    delay(10000);
}