<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h4>Available balance in savings: </h4><h5><%=(String)session.getAttribute("savings") %></h5>
<h4>Available balance in primary: </h4><h5><%=(String)session.getAttribute("primary") %></h5>
<form action="Withdraw" method="get">
<h1>From which account you want to withdraw</h1>
<br>
<input type="radio" id="savings" name="savings" value="savings">
 <label for="savings">Savings</label><br>
 <input type="radio" id="primary" name="savings" value="primary">
 <label for="primary">primary</label><br><br>
Enter amount to be withdrawn:<input type="text" name="withdraw"><br>
Enter reason to withdraw: <input type="text" name="reason">
<br>
<input type="submit" value="Withdraw">
</form>
</body>
</html>