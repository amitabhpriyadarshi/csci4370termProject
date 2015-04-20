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
import model.Vehicle;
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
                usr.setPassword(rs.getString("password"));
                usr.setFirstName(rs.getString("firstName"));
                usr.setLastName(rs.getString("lastName"));
                usr.setDob(rs.getString("dob"));
                usr.setStreet(rs.getString("street"));
                usr.setPhone(rs.getString("phone"));
                usr.setEmail(rs.getString("email"));
                usr.setDlNumber(rs.getString("dlNumber"));
                usr.setExpDate(rs.getString("expDate"));
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
        System.out.println("m here: retriveuser fn");
        List<User> usrList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            ps.setString(1, userID);
            rs=ps.executeQuery();
            while(rs.next()){
                usr=new User();
                usr.setUserID(rs.getString("userID"));
                usr.setPassword(rs.getString("password"));
                usr.setFirstName(rs.getString("firstName"));
                usr.setLastName(rs.getString("lastName"));
                usr.setDob(rs.getString("dob"));
                usr.setStreet(rs.getString("street"));
                usr.setPhone(rs.getString("phone"));
                usr.setEmail(rs.getString("email"));
                usr.setDlNumber(rs.getString("dlNumber"));
                usr.setExpDate(rs.getString("expDate"));
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
     public List<User> login(String userID){
        User usr=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        String qry="select * from user where userID = ?";
        System.out.println("m here: retriveuser fn");
        List<User> usrList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            ps.setString(1, userID);
            rs=ps.executeQuery();
            while(rs.next()){
                usr=new User();
                usr.setUserID(rs.getString("userID"));
                usr.setPassword(rs.getString("password"));
                usr.setFirstName(rs.getString("firstName"));
                usr.setLastName(rs.getString("lastName"));
                usr.setDob(rs.getString("dob"));
                usr.setStreet(rs.getString("street"));
                usr.setPhone(rs.getString("phone"));
                usr.setEmail(rs.getString("email"));
                usr.setDlNumber(rs.getString("dlNumber"));
                usr.setExpDate(rs.getString("expDate"));
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
        
        String qry="INSERT INTO user (userID,password,firstName,lastName,dob,street,phone,email,dlNumber,expDate,city,state,zip,role)"
        		+ "VALUES('"+usr.getUserID()+"','"+usr.getPassword()+"','"+usr.getFirstName()+"','"+usr.getLastName()+"','"+usr.getDob()+"','"
        		+usr.getStreet()+"','"+usr.getPhone()+"','"+usr.getEmail()+"','"+usr.getDlNumber()+"','"+usr.getExpDate()+"','"+usr.getCity()+"','"
        		+usr.getState()+"','"+usr.getZip()+"','"+usr.getRole()+"')";
        String msg;
        System.out.println("m here: insert user fn and qry is:"+qry);
        
        try{
            ps=con.prepareStatement(qry);
            ps.execute();
            ps.close();       
            msg="success";
        }catch(Exception e){
            e.printStackTrace();
            msg="failed";
         
        }
     return msg;
    }
    
    public String registerUser(User usr){
        
        System.out.println(usr.getName());
         System.out.println(usr.getPhone());
        PreparedStatement ps=null;
        ResultSet rs=null;
        
        String qry="INSERT INTO user (userID,name,phone,dob,email,dlNumber,expDate,issueDate,passwd,street,apartmentNo,city,state,zip,role)VALUES('"+usr.getUserID()+"','"+usr.getName()+"','"+usr.getPhone()+"','"+usr.getDob()+"','"+usr.getEmail()+"','"+usr.getDlNumber()+"','"+usr.getExpDate()+"','"+usr.getIssueDate()+"','"+usr.getPassword()+"','"+usr.getStreet()+"','"+usr.getApartmentNo()+"','"+usr.getCity()+"','"+usr.getState()+"','"+usr.getZip()+"','"+usr.getRole()+"')";
        String msg;
        System.out.println("m here: insert user fn and qry is:"+qry);
        try{
            ps=con.prepareStatement(qry);
            ps.execute();
            ps.close();       
            msg="success";
        }catch(Exception e){
            e.printStackTrace();
            msg="failed";
         
        }
     return msg;
    }
    
public List<Vehicle> retrieveAllVehicle(){
        Vehicle vehicle=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        String qry="select * from vehicle";
        List<Vehicle> vehicleList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            rs=ps.executeQuery();
            while(rs.next()){
                vehicle=new Vehicle();
                
                vehicle.setId(rs.getString("id"));
                vehicle.setClass_(rs.getString("class"));
                vehicle.setModel(rs.getString("model"));
                vehicle.setMake(rs.getString("make"));
                vehicle.setColor(rs.getString("color"));
                vehicle.setOdometer(rs.getString("odometer"));
                vehicle.setTransmission(rs.getString("transmission"));
                vehicle.setFuel(rs.getString("fuel"));
                vehicle.setDrive(rs.getString("drive"));
                vehicle.setPlateNumber(rs.getString("plateNumber"));
                vehicle.setStatus(rs.getString("status"));
                
                vehicleList.add(vehicle);
            }
            ps.close();            
        }catch(Exception e){
            e.printStackTrace();
            vehicle=null;
        }
     return vehicleList;
    }
     
     
    public String insertVehicle(Vehicle vehicle){
        
        PreparedStatement ps=null;
        ResultSet rs=null;
        
        String qry="INSERT INTO vehicle (class,model,make,color,odometer,transmission,fuel,drive,plateNumber,status)VALUES('"+
                vehicle.getClass_()+"','"+vehicle.getModel()+"','"+vehicle.getMake()+"','"+vehicle.getColor()+"','"+vehicle.getOdometer()+
                "','"+vehicle.getTransmission()+"','"+vehicle.getFuel()+"','"+vehicle.getDrive()+"','"+vehicle.getPlateNumber()+"','"
                +vehicle.getStatus()+"')";
        
        String msg;
        
        try{
            ps=con.prepareStatement(qry);
            ps.execute();
            ps.close();       
            msg="success";
        }catch(Exception e){
            e.printStackTrace();
            msg="failed";
        }
     return msg;
    }
}
