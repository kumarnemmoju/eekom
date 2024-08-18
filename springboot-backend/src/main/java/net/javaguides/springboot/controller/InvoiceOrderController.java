package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.InvoiceOrder;
import net.javaguides.springboot.service.InvoiceOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoice-orders")
@CrossOrigin(origins = "http://localhost:4200")
public class InvoiceOrderController {

    @Autowired
    private InvoiceOrderService invoiceOrderService;

    @PostMapping
    public String createInvoiceOrder(@RequestBody InvoiceOrder order) {
        invoiceOrderService.createInvoiceOrder(order);
        return "Invoice generated and saved successfully!";
    }
}
