package com.example.requiemrestservice.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.util.Base64;
import java.util.UUID;

public class Base64Helper {
    public static String base64ToFile(String folder, String base64String) {
        if(base64String == null) return null;
        String folderPath = "src\\main\\resources\\static\\storage"+ File.separator +  folder;
        File directory = new File(folderPath);
        if (!directory.exists()) {
            directory.mkdir();
        }

        String uniqueFileName = UUID.randomUUID().toString() + ".jpg";
        String filePath = folderPath + File.separator + uniqueFileName;

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            byte[] fileBytes = Base64.getDecoder().decode(base64String);
            fos.write(fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return filePath;
    }

    public static String fileToBase64(String imagePath) {
        if(imagePath == null) return null;
        File file = new File(imagePath);
        if (file.exists()) {
            try {
                byte[] imageBytes = Files.readAllBytes(file.toPath());
                return Base64.getEncoder().encodeToString(imageBytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
