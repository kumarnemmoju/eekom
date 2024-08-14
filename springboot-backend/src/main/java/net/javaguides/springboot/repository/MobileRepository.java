package net.javaguides.springboot.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.springboot.model.Mobile;

public interface MobileRepository extends JpaRepository<Mobile, Long> {
}

