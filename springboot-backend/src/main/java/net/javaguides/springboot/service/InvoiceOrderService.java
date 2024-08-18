package net.javaguides.springboot.service;

import net.javaguides.springboot.model.InvoiceOrder;
import net.javaguides.springboot.repository.InvoiceOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class InvoiceOrderService {

    @Autowired
    private InvoiceOrderRepository invoiceOrderRepository;

    public InvoiceOrder createInvoiceOrder(InvoiceOrder order) {
        String directoryPath = "E:/EEKOM PDF FILES";
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }
        String pdfFilePath = directoryPath + "/invoice_" + order.getEmailId() + ".pdf";
        InvoiceOrder savedOrder = invoiceOrderRepository.save(order);
        PDFGenerator.generateInvoice(savedOrder, pdfFilePath);
        return savedOrder;
    }
}
