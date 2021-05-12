package loginpackage ;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
@WebServlet("/Register")
public class Register extends HttpServlet {
protected void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException
{
	
	String uname=request.getParameter("uname");
	String pass=request.getParameter("pass");
	String mob=request.getParameter("mobile");
	String email=request.getParameter("email");
	System.out.println("heuuu");
	LoginDao dao=new LoginDao();
	System.out.println("kkkkk");
	try {
		if(dao.addDetail(uname, pass,mob,email))
		{	

			response.sendRedirect("mno.jsp");
		}
		else
		{
			response.sendRedirect("error.jsp");
		}
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
