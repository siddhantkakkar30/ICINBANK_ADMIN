package loginpackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class LoginDao {
public boolean checkDetail(String uname,String password) throws SQLException
{
	System.out.println("hello");	
	try {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/nikheel","root","nikhil");
		PreparedStatement st=con.prepareStatement("select * from login where uname=? and pass=?");
		st.setString(1, uname);
		st.setString(2, password);
		ResultSet rs=st.executeQuery();
		if(rs.next())
		{
			return true;
		}
	} catch (ClassNotFoundException e) {
		
		e.printStackTrace();
	}
	return false;
}
public boolean addDetail(String uname,String password, String mob,String email) throws SQLException
{
		
	try {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/nikheel","root","nikhil");
		PreparedStatement mn=con.prepareStatement("select * from login where uname=? and pass=?");
		mn.setString(1, uname);
		mn.setString(2, password);
		ResultSet rs=mn.executeQuery();
		if(rs.next())
		{
			return false;
		}
		PreparedStatement st=con.prepareStatement("insert into login values(? ,?,?,?,?,?)");
		st.setString(1, uname);
		st.setString(2, password);
		st.setInt(3, 0);
		st.setInt(4, 0);
		st.setString(5, mob);
		st.setString(6, email);
		int count=st.executeUpdate();
		System.out.println("helloOIOIOIOO");
		if(count>0)
		{
			return true;
		}
	} catch (ClassNotFoundException e) {
		
		e.printStackTrace();
	}
	return false;
}
}
