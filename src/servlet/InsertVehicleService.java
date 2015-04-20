/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.Dao;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.User;
import model.Vehicle;

/**
 *
 * @author Jeet
 */
@WebServlet(name = "InsertVehicleService", urlPatterns = {"/InsertVehicleService"})
public class InsertVehicleService extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet InsertVehicleService</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet InsertVehicleService at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       PrintWriter out = response.getWriter();
       
       Vehicle vehicle = new Vehicle();
       vehicle.setClass_(request.getParameter("class_"));
       vehicle.setModel(request.getParameter("model"));
       vehicle.setMake(request.getParameter("make"));
       vehicle.setColor(request.getParameter("color"));
       vehicle.setOdometer(request.getParameter("odometer"));
       vehicle.setTransmission(request.getParameter("transmission"));
       vehicle.setFuel(request.getParameter("fuel"));
       vehicle.setDrive(request.getParameter("drive"));
       vehicle.setPlateNumber(request.getParameter("plateNumber"));
       vehicle.setStatus(request.getParameter("status"));
      
       Dao dao=new Dao();
       String msg =dao.insertVehicle(vehicle);
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
    
    public User fromJSON(String string) {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyy-MM-dd'T'HH:mm:ss.SSS'Z'"); 								// UTC
        Gson gson = gsonBuilder.create();
        
        return gson.fromJson(string,User.class);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
