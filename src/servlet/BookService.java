/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import model.Rent;
import model.Address;
import model.VehicleClass;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.Dao;

import java.util.List;

/**
 *
 * @author amitabh + derek
 */
@WebServlet(name = "BookService", urlPatterns = { "/BookService" })
public class BookService extends HttpServlet {

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		try (PrintWriter out = response.getWriter()) {
			/* TODO output your page here. You may use following sample code. */
			out.println("<!DOCTYPE html>");
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Servlet BookService</title>");
			out.println("</head>");
			out.println("<body>");
			out.println("<h1>Servlet BookService at "
					+ request.getContextPath() + "</h1>");
			out.println("</body>");
			out.println("</html>");
		}
	}

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();

		Dao dao = new Dao();
		List<Address> addressList = dao.retrieveAllAddress();
		String res = toJSONString(addressList);
		out.println(res);
		out.close();
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();

		String userID = request.getParameter("userID");
		Dao dao = new Dao();
		List<Rent> rentalList = dao.retrieveBookInfo(userID);
		String res = toJSONString(rentalList);
		out.println(res);

		out.close();
	}

	public String toJSONString(Object object) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // UTC
		Gson gson = gsonBuilder.create();
		return gson.toJson(object);
	}

	public Rent fromJSON(String string) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // UTC
		Gson gson = gsonBuilder.create();

		return gson.fromJson(string, Rent.class);

	}

	@Override
	public String getServletInfo() {
		return "Short description";
	}

}
