FROM openjdk:8-jdk-alpine

WORKDIR .

ADD target/listing-scales.jar app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","app.jar"]
EXPOSE 8090
