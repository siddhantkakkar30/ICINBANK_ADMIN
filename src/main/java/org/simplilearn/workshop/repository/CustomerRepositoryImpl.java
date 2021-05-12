package org.simplilearn.workshop.repository;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.simplilearn.workshop.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "customerRepository")
public class CustomerRepositoryImpl implements CustomerRepository {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public List<Customer> getCustomers() {
         // get the current hibernate session
        Session currentSession = sessionFactory.getCurrentSession();
        
        //create a query .. sort by last name
        Query<Customer> theQuery =
                currentSession.createQuery("from Customer order by lastName",Customer.class);
        
        //execute query and get result list
        List<Customer> customers = theQuery.getResultList();
        
        return customers;
    }
    
    @Override
	public void saveCustomer(Customer theCustomer) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// save/upate the customer ... finally LOL
		currentSession.saveOrUpdate(theCustomer);
		
	}

	@Override
	public Customer getCustomer(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// now retrieve/read from database using the primary key
		Customer theCustomer = currentSession.get(Customer.class, theId);
		
		return theCustomer;
	}

	/*
	 * @Override public void deleteCustomer(int theId) {
	 * 
	 * // get the current hibernate session Session currentSession =
	 * sessionFactory.getCurrentSession();
	 * 
	 * // delete object with primary key Query theQuery =
	 * currentSession.createQuery("delete from Customer where id=:customerId");
	 * theQuery.setParameter("customerId", theId);
	 * 
	 * theQuery.executeUpdate(); }
	 */

}
