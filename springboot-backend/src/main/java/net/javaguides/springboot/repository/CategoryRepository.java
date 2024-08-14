package net.javaguides.springboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.springboot.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByType(String type);
}

