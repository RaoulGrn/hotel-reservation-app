package grnraoul.hotelreservationapp.config;

import grnraoul.hotelreservationapp.service.DataService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    private final DataService dataService;

    public AppConfig(DataService dataService) {
        this.dataService = dataService;
    }


    @Bean
    public CommandLineRunner loadData(){
        return args -> {
            String jsonFilePath = "src/main/resources/hotels.json";
            dataService.populateDatabaseFromJson(jsonFilePath);
        };
    }
}
