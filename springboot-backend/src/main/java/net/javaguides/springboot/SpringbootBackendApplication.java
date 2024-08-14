package net.javaguides.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "net.javaguides.springboot")
@EntityScan(basePackages = "net.javaguides.springboot.model")
@EnableJpaRepositories(basePackages = "net.javaguides.springboot.repository")
public class SpringbootBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }
}
