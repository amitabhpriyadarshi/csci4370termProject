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
@WebServlet(name = "UserService", urlPatterns = {"/UserService"})
public class UserService extends HttpServlet {
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet UserService</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UserService at " + request.getContextPath() + "</h1>");
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
        Dao dao=new Dao();
        List<User> usrList =dao.retrieveAllUser();
        String res = toJSONString(usrList);
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
