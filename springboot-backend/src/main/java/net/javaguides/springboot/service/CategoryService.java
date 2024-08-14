package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.model.Category;
import net.javaguides.springboot.repository.CategoryRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Map<String, Object> getCategories() {
        Map<String, Object> categoriesResponse = new HashMap<>();

        List<Category> fresh = categoryRepository.findByType("fresh");
        List<Category> prime = categoryRepository.findByType("prime");
        List<Category> category = categoryRepository.findByType("category");

        categoriesResponse.put("fresh", fresh.stream().map(Category::getValue).toArray());
        categoriesResponse.put("prime", prime.stream().map(Category::getValue).toArray());
        categoriesResponse.put("category", category.stream().map(Category::getValue).toArray());

        return categoriesResponse;
    }
}

