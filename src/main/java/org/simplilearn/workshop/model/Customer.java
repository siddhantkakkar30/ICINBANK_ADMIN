package org.simplilearn.workshop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="customer")
public class Customer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="user_name")
    private String userName;
    
    @Column(name="first_name")
    private String firstName;
    
    @Column(name="last_name")
    private String lastName;
    
    @Column(name="email")
    private String email;
    
    @Column(name="phone")
    private String phone;
    
    @Column(name="primary_account")
    private String primaryAccount;
    
    @Column(name="saving_account")
    private String savingAccount;
    
    @Column(name="enabled")
    private String enabled;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPrimaryAccount() {
		return primaryAccount;
	}

	public void setPrimaryAccount(String primaryAccount) {
		this.primaryAccount = primaryAccount;
	}

	public String getSavingAccount() {
		return savingAccount;
	}

	public void setSavingAccount(String savingAccount) {
		this.savingAccount = savingAccount;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public Customer() {
		super();
	}

	@Override
	public String toString() {
		return String.format(
				"Customer [id=%s, userName=%s, firstName=%s, lastName=%s, email=%s, phone=%s, primaryAccount=%s, savingAccount=%s, enabled=%s]",
				id, userName, firstName, lastName, email, phone, primaryAccount, savingAccount, enabled);
	}
    
    
    
    
    
}
