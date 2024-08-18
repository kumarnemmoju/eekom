package net.javaguides.springboot.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "invoice_orders")
public class InvoiceOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceOrderId;

    private String emailId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_order_id")
    private List<InvoiceMobile> mobilesOrdered;

    @Embedded
    private InvoiceAddress deliveryAddress;

    private int totalPrice;

    // Getters and Setters

    public Long getInvoiceOrderId() {
        return invoiceOrderId;
    }

    public void setInvoiceOrderId(Long invoiceOrderId) {
        this.invoiceOrderId = invoiceOrderId;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public List<InvoiceMobile> getMobilesOrdered() {
        return mobilesOrdered;
    }

    public void setMobilesOrdered(List<InvoiceMobile> mobilesOrdered) {
        this.mobilesOrdered = mobilesOrdered;
    }

    public InvoiceAddress getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(InvoiceAddress deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}
