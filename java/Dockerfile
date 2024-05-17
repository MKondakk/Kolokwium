FROM openjdk:17.0.1 AS build
WORKDIR /app
COPY src /app/src
RUN javac src/Main.java

FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/src/Main.class /app
ENV API_URL=http://host.docker.internal:3000
VOLUME /app/data
CMD ["java", "Main"]
