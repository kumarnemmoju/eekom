package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.InvoiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceOrderRepository extends JpaRepository<InvoiceOrder, Long> {
}
