package org.simplilearn.workshop.service;

import java.util.List;

import org.simplilearn.workshop.model.Customer;

public interface CustomerService {

	public List<Customer> getCustomers();
	
	public void saveCustomer(Customer theCustomer);

	public Customer getCustomer(int theId);

	//public void deleteCustomer(int theId);
}
