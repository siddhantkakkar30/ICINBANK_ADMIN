package org.simplilearn.workshop.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
	sendLoginForm(response,false);
	}

	private void sendLoginForm(HttpServletResponse response, boolean withErrorMessage) throws IOException {
		response.setContentType("text/Html");
		PrintWriter out = response.getWriter();
		out.println("<HTML>");
		out.println("<HEAD>");
		out.println("<TITLE> Login page </TITLE>");
		out.println("</HEAD>");
		out.println("<BODY>");
		
		if(withErrorMessage) {
			out.println("Wrong Username or password. PLEASE TRY AGAIN");
		}
		
		out.println("<BR>");
		out.println("<BR> <h1> Enter login details.<h1>");
		out.println("<BR><FORM METHOD=POST>");
		out.println("<BR>USER-NAME :<INPUT TYPE=TEXT NAME =userName>"); 
		out.println("<BR> PASSWORD : <input type=\"password\" name=\"password\">"); 
		out.println("<BR>");
		out.println("<BR><INPUT TYPE=SUBMIT VALUE=Submit>"); 
		out.println("</FORM>");
		out.println("</BODY>"); 
		out.println("</HTML>");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		
		if(userName!=null && password!=null && userName.equals("siddhant") && password.equals("kakkar" )) {
			RequestDispatcher dispatcher = request.getRequestDispatcher("helloworld.jsp");
			dispatcher.forward(request, response);
		}else {
			sendLoginForm(response, true);
		}
	}

}
