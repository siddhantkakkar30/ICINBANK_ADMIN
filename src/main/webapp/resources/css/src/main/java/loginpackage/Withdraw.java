package loginpackage;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class Withdraw
 */
@WebServlet("/Withdraw")
public class Withdraw extends HttpServlet {
	String currPri;
	String currSavings;
	String primar;
	String savingWith;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session=request.getSession();
		String s=request.getParameter("savings");
		String reason=request.getParameter("reason");
		if(s.equals("savings"))
		{	
			savingWith=request.getParameter("withdraw");
			currSavings = (String) session.getAttribute("savings");
			currSavings=Integer.toString(Integer.parseInt(currSavings)-Integer.parseInt(savingWith));	
			System.out.println("current savings is "+currSavings);
			session.setAttribute("savings", currSavings);
		}
		else if(s.equals("primary"))
				{
			primar=request.getParameter("withdraw");
			currPri = (String) session.getAttribute("primary");
			currPri=Integer.toString(Integer.parseInt(currPri)-Integer.parseInt(primar));	
			System.out.println("current primary is "+currPri);
			session.setAttribute("primary", currPri);
				}
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/nikheel","root","nikhil");
			PreparedStatement st=con.prepareStatement("insert into withdraw values(? ,?,? )");
			st.setString(1,reason );
			if(s.equals("savings"))
			{
			st.setString(2, savingWith);
			}
			if(s.equals("primary"))
			{
			st.setString(2, primar);
			}
			st.setString(3, s);
			int count=st.executeUpdate();
		response.sendRedirect("details.jsp");
	}
		catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

}
}
