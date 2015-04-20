/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
package servlet;

import model.Rent;
import model.User;
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
@WebServlet(name = "InsertRentService", urlPatterns = {"/InsertRentService"})
public class InsertRentService extends HttpServlet {
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet InsertRentService</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet InsertRentService at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	PrintWriter out = response.getWriter();
    	Dao dao = new Dao();
    	List<VehicleClass> vehicleClassList = dao.retrieveAllVehicleClass();
    	String res = toJSONString(vehicleClassList);
    	out.println(res);
    	out.close();

    }
    
    
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	PrintWriter out = response.getWriter();
    	
    	Rent rental = new Rent();
    	rental.setPickDate(request.getParameter("pickDate"));
    	rental.setReturnDate(request.getParameter("returnDate"));
    	rental.setTotalRent(request.getParameter("totalRent"));
    	rental.setTax(request.getParameter("tax"));
    	rental.setConfirmationNo(request.getParameter("confirmationNo"));
    	rental.setUserID(request.getParameter("userID"));
    	rental.setClass_(request.getParameter("class_"));
    	rental.setPickupLocID(request.getParameter("pickupLocID"));
    	rental.setReturnLocID(request.getParameter("returnLocID"));
    	rental.setGps(request.getParameter("gps"));
    	rental.setDamageWaiver(request.getParameter("damageWaiver"));
    	rental.setInsurance(request.getParameter("insurance"));
    	rental.setRoadsideAssistance(request.getParameter("roadsideAssistance"));
    	rental.setLiabilityProtection(request.getParameter("liabilityProtection"));

       Dao dao=new Dao();
       String msg = dao.insertRent(rental);
       String res = toJSONString(msg);
       out.println(res);
        
        out.close();
    }
    public String toJSONString(Object object) {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'"); 								// UTC
        Gson gson = gsonBuilder.create();
        return gson.toJson(object);
    }
    
    public Rent fromJSON(String string) {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'"); 								// UTC
        Gson gson = gsonBuilder.create();
        
        return gson.fromJson(string,Rent.class);
        
    }
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }
    
}
