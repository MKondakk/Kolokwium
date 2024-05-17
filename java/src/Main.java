import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        String apiUrl = System.getenv("API_URL"); 
        try {
            URL url = new URL(apiUrl + "/records");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            String jsonData = "{\"stringValue\": \"example\", \"intValue\": 123}";
            byte[] postData = jsonData.getBytes(StandardCharsets.UTF_8);

            con.setRequestMethod("POST");

            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Content-Length", String.valueOf(postData.length));
            con.setRequestProperty("Accept", "application/json");

            con.setDoOutput(true);
            con.setFixedLengthStreamingMode(postData.length);

            try (OutputStream os = con.getOutputStream()) {
                os.write(postData);
                os.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_CREATED) {
                System.out.println("Record added successfully.");
            } else {
                System.out.println("Failed to add record. Response code: " + responseCode);
            }

            con.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
