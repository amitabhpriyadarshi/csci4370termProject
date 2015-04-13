/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.util.ArrayList;
import java.util.List;
import model.User;
import util.Util;

/**
 *
 * @author amitabh
 */
public class Dao {
    
    Connection con=null;
    public Dao() {
        try{
        Class.forName(Util.DRIVER);
            if(con==null){
                 con=DriverManager.getConnection(Util.DB_URL);
            }      
        }catch(Exception e){e.printStackTrace();}
    }
   
    public List<User> retrieveAllUser(){
        User usr=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        String qry="select * from user";
        List<User> usrList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            rs=ps.executeQuery();
            while(rs.next()){
                usr=new User();
                usr.setUserID(rs.getString("userID"));
                usr.setName(rs.getString("name"));
                usr.setPhone(rs.getString("phone"));
                
                usr.setDob(rs.getString("dob"));
                usr.setEmail(rs.getString("email"));
                usr.setDlNumber(rs.getString("dlNumber"));
                usr.setExpDate(rs.getString("expDate"));
                usr.setIssueDate(rs.getString("issueDate"));
                usr.setPassword(rs.getString("password"));
                usr.setStreet(rs.getString("street"));
                usr.setApartmentNo(rs.getString("apartmentNo"));
                usr.setCity(rs.getString("city"));
                usr.setState(rs.getString("state"));
                usr.setZip(rs.getString("zip"));
                usr.setRole(rs.getString("role"));
                usrList.add(usr);
                }
            ps.close();            
        }catch(Exception e){
            e.printStackTrace();
            usr=null;
        }
     return usrList;
    }
    
    
    public List<User> retrieveUser(String userID){
        User usr=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        String qry="select * from user where userID = ?";
        
        List<User> usrList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            ps.setString(1, userID);
            rs=ps.executeQuery();
            while(rs.next()){
                usr=new User();
                usr.setUserID(rs.getString("userID"));
                usr.setName(rs.getString("name"));
                usr.setPhone(rs.getString("phone"));
                
                usr.setDob(rs.getString("dob"));
                usr.setEmail(rs.getString("email"));
                usr.setDlNumber(rs.getString("dlNumber"));
                usr.setExpDate(rs.getString("expDate"));
                usr.setIssueDate(rs.getString("issueDate"));
                
                
                
                usr.setPassword(rs.getString("password"));
                usr.setStreet(rs.getString("street"));
                usr.setApartmentNo(rs.getString("apartmentNo"));
                usr.setCity(rs.getString("city"));
                usr.setState(rs.getString("state"));
                usr.setZip(rs.getString("zip"));
                usr.setRole(rs.getString("role"));
                usrList.add(usr);
                }
            ps.close();            
        }catch(Exception e){
            e.printStackTrace();
            usr=null;
        }
     return usrList;
    }
    
    
    
    public String insertUser(User usr){
        
        PreparedStatement ps=null;
        ResultSet rs=null;
        
        String qry="INSERT INTO user (userID,name,phone,dob,email,dlNumber,expDate,issueDate,password,street,apartmentNo,city,state,zip,role)VALUES("+usr.getUserID()+","+usr.getName()+","+usr.getPhone()+","+usr.getDob()+","+usr.getEmail()+","+usr.getDlNumber()+","+usr.getExpDate()+","+usr.getIssueDate()+","+usr.getPassword()+","+usr.getStreet()+","+usr.getApartmentNo()+","+usr.getCity()+","+usr.getState()+","+usr.getZip()+","+usr.getRole()+")";
        String msg;
        
        try{
            ps=con.prepareStatement(qry);
            rs=ps.executeQuery();
            ps.close();       
            msg="success";
        }catch(Exception e){
            e.printStackTrace();
            msg="failed";
         
        }
     return msg;
    }

}
