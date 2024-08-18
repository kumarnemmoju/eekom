package net.javaguides.springboot.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import net.javaguides.springboot.model.InvoiceOrder;
import net.javaguides.springboot.model.InvoiceMobile;

import java.io.IOException;

public class PDFGenerator {

    public static void generateInvoice(InvoiceOrder order, String filePath) {
        PdfWriter writer = null;
        PdfDocument pdfDoc = null;
        Document document = null;
        
        try {
            // Initialize PdfWriter, PdfDocument, and Document
            writer = new PdfWriter(filePath);
            pdfDoc = new PdfDocument(writer);
            document = new Document(pdfDoc);

            // Add text-based logo
            Paragraph logoText = new Paragraph("MOBIVERSE")
                    .setBold()
                    .setFontSize(26)
                    .setTextAlignment(com.itextpdf.layout.property.TextAlignment.CENTER);
            document.add(logoText);

            // Add title
            document.add(new Paragraph("INVOICE").setBold().setFontSize(20).setTextAlignment(com.itextpdf.layout.property.TextAlignment.CENTER));

            // Add customer details
            document.add(new Paragraph("Email ID: " + order.getEmailId()));
            document.add(new Paragraph("Delivery Address: " + order.getDeliveryAddress().getStreet() + ", " +
                    order.getDeliveryAddress().getCity() + ", " +
                    order.getDeliveryAddress().getState() + " - " +
                    order.getDeliveryAddress().getPostalCode() + ", " +
                    order.getDeliveryAddress().getCountry()));

            // Add table for mobiles ordered
            if (order.getMobilesOrdered() != null && !order.getMobilesOrdered().isEmpty()) {
                float[] pointColumnWidths = {150F, 100F, 100F, 100F};
                Table table = new Table(pointColumnWidths);

                table.addCell(new Cell().add(new Paragraph("Mobile Name")));
                table.addCell(new Cell().add(new Paragraph("Series")));
                table.addCell(new Cell().add(new Paragraph("RAM")));
                table.addCell(new Cell().add(new Paragraph("Price")));

                for (InvoiceMobile mobile : order.getMobilesOrdered()) {
                    table.addCell(new Cell().add(new Paragraph(mobile.getName())));
                    table.addCell(new Cell().add(new Paragraph(mobile.getSeries())));
                    table.addCell(new Cell().add(new Paragraph(mobile.getRam())));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(mobile.getPrice()))));
                }

                document.add(table);
            } else {
                // Add a message if no mobiles were ordered
                document.add(new Paragraph("No mobiles were ordered."));
            }

            // Add total price
            document.add(new Paragraph("Total Price: $" + order.getTotalPrice()));

        } catch (IOException e) {
            e.printStackTrace();
            // Log the exception and handle it appropriately
        } finally {
            // Close document and PdfDocument to ensure everything is written properly
            if (document != null) {
                document.close();
            }
            if (pdfDoc != null) {
                pdfDoc.close();
            }
        }
    }
}
