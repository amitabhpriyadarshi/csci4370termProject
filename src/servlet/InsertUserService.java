/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
package servlet;

import model.User;
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
 * @author amitabh
 */
@WebServlet(name = "InsertUserService", urlPatterns = {"/InsertUserService"})
public class InsertUserService extends HttpServlet {
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet InsertUserService</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet InsertUserService at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request,response);
    }
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        
        User usr = new User();
        
        usr.setUserID(request.getParameter("userID"));
        usr.setPassword(request.getParameter("password"));
        usr.setFirstName(request.getParameter("firstName"));
        usr.setLastName(request.getParameter("lastName"));
        usr.setDob(request.getParameter("dob"));
        usr.setStreet(request.getParameter("street"));
        usr.setPhone(request.getParameter("phone"));
        usr.setEmail(request.getParameter("email"));
        usr.setDlNumber(request.getParameter("dlNumber"));
        usr.setExpDate(request.getParameter("expDate"));
        usr.setCity(request.getParameter("city"));
        usr.setState(request.getParameter("state"));
        usr.setZip(request.getParameter("zip"));
        usr.setRole("User");
         
        Dao dao=new Dao();
        String msg =dao.insertUser(usr);
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
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }
    
}
