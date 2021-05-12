<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<form action="Deposit" method="get">
<h1>In which account you want to deposit</h1>
<br>
<input type="radio" id="savings" name="savings" value="savings">
 <label for="savings">Savings</label><br>
 <input type="radio" id="primary" name="savings" value="primary">
 <label for="primary">primary</label><br><br>
Enter amount to be deposited:<input type="text" name="deposited"><br>
Enter the reason to deposit:<input type="text" name="reason"><br>
<br>
<input type="submit" value="Deposit">
</form>
</body>
</html>