FROM openjdk:8-jdk-alpine

WORKDIR .

COPY . /

# maven 
RUN apk add maven npm nodejs
RUN npm install
RUN npm run build
RUN mvn package
RUN ls target 


ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/target/listing-scales.jar"]
EXPOSE 8090
