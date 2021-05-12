package loginpackage ;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
@WebServlet("/Login")
public class Login extends HttpServlet {
protected void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException
{	System.out.println("hellllal");
	String uname=request.getParameter("uname");
	String pass=request.getParameter("pass");
	LoginDao dao=new LoginDao();
	
	try {
		if(dao.checkDetail(uname, pass))
		{	
			HttpSession session=request.getSession();
			session.setAttribute("username", uname);
			session.setAttribute("pass", pass);
			response.sendRedirect("details.jsp");
		}
		else
		{
			response.sendRedirect("login.jsp");
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
