package org.simplilearn.workshop.service;

import java.util.List;

import org.simplilearn.workshop.model.Customer;
import org.simplilearn.workshop.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(value = "customerService")
public class CustomerServiceImpl implements CustomerService {
   
	@Autowired
    private CustomerRepository customerRepository;
    @Override
    @Transactional
    public List<Customer> getCustomers() {
        return customerRepository.getCustomers();
    }
    
    @Override
	@Transactional
	public void saveCustomer(Customer theCustomer) {

		customerRepository.saveCustomer(theCustomer);
	}

	@Override
	@Transactional
	public Customer getCustomer(int theId) {
		
		return customerRepository.getCustomer(theId);
	}

	/*
	 * @Override
	 * 
	 * @Transactional public void deleteCustomer(int theId) {
	 * 
	 * customerRepository.deleteCustomer(theId); }
	 */


}

