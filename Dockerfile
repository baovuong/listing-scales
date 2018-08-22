FROM openjdk:8-jdk-alpine

WORKDIR .

COPY . /

RUN cp deployment/application.properties src/main/resources/

# maven 
RUN apk add maven npm nodejs
RUN npm install
RUN npm run build
RUN mvn package

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/target/listing-scales.jar"]
EXPOSE 8090
