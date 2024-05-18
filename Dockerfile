# Use a base image with JDK 17
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the application JAR file from the target directory to the container
COPY target/hotel-reservation-app-0.0.1-SNAPSHOT.jar /app/hotel-reservation-app-0.0.1-SNAPSHOT.jar

COPY src /app/src

EXPOSE 8080

# Command to run the Java application
CMD ["java", "-jar", "/app/hotel-reservation-app-0.0.1-SNAPSHOT.jar"]