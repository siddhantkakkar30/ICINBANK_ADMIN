<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
System.out.println("tilla");
try {
	Class.forName("com.mysql.jdbc.Driver");
	Connection con=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/nikheel","root","nikhil");
	String un=(String) session.getAttribute("username");
	String pass=(String) session.getAttribute("pass");
	System.out.println(un);
	PreparedStatement s = con.prepareStatement("select * from login where uname=? and pass=?");
	s.setString(1, un);
	s.setString(2,pass);
	ResultSet rs=s.executeQuery();
	rs.next();
	out.println("Primary balance "+rs.getString(3));
	out.println("Savings balance "+rs.getString(4));
}
catch (ClassNotFoundException e) {
	
	e.printStackTrace();
} catch (SQLException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
%>
<br>
<br>
Go to deposit:<form action="deposit.jsp">
<input type="submit" value="Go to deposit">
</form>
<br>
<br>
Go to Withdraw:<form action="withdraw.jsp">
<input type="submit" value="Go to withdraw">
</form>
</body>
</html>