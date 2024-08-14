package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.javaguides.springboot.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}
