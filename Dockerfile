# Etapa 1: Build
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/wiki-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Comandos de uso:
# docker build -t wiki-app .
# docker run -p 8080:8080 wiki-app
