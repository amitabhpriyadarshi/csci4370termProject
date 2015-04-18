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
import model.Rent;
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
                usr.setId(rs.getString("id"));
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
                usr.setId(rs.getString("id"));
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
    
    public List<Rent> retrieveAllRentals(){
        Rent rental = null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        String qry="select * from rent";
        List<Rent> rentalList = new ArrayList();
        try{
            ps=con.prepareStatement(qry);
            rs=ps.executeQuery();
            while(rs.next()){
                rental=new Rent();
                rental.setId(rs.getString("id"));
                rental.setPickdate(rs.getString("pickdate"));
                rental.setReturnDate(rs.getString("returnDate"));
                rental.setTotalRent(rs.getString("totalRent"));
                rental.setTax(rs.getString("tax"));
                rental.setConfirmationNo(rs.getString("confirmationNo"));
                rental.setUser_id(rs.getString("user_id"));
                rental.setVehicle_id(rs.getString("vehicle_id"));
                rental.setPickuploc_id(rs.getString("pickuploc_id"));
                rental.setReturnloc_id(rs.getString("returnloc_id"));
                rentalList.add(rental);
                }
            ps.close();            
        }catch(Exception e){
            e.printStackTrace();
            rental=null;
        }
     return rentalList;
    }
    
    public String insertUser(User usr){
        
        PreparedStatement ps=null;
        ResultSet rs=null;
        
        String qry="INSERT INTO user (userID,name,phone,dob,email,dlNumber,expDate,issueDate,password,street,apartmentNo,city,state,zip,role)VALUES("+usr.getId()+","+usr.getName()+","+usr.getPhone()+","+usr.getDob()+","+usr.getEmail()+","+usr.getDlNumber()+","+usr.getExpDate()+","+usr.getIssueDate()+","+usr.getPassword()+","+usr.getStreet()+","+usr.getApartmentNo()+","+usr.getCity()+","+usr.getState()+","+usr.getZip()+","+usr.getRole()+")";
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

    public List<Vehicle> retrieveVehicleInfo(){
    	Vehicle veh = null;
    	PreparedStatement ps = null;
    	ResultSet rs = null;
    	List<Vehicle> vehList = new ArrayList();
    	
    	String query = "SELECT * FROM vehicle";

    	try{
    		ps = con.prepareStatement(query);
    		rs = ps.executeQuery();
    		while(rs.next()){
    			veh = new Vehicle();
    			veh.setModel(rs.getString("model"));
    			veh.setNumberplate(rs.getString("plateNumber"));
    			vehList.add(veh);
    		}
    		
    		ps.close();
    	}catch(Exception e){
    		e.printStackTrace();
    		veh = null;
    	}
    	return vehList;
    }
    
    public String insertRent(Rent rent){
    	PreparedStatement ps = null;
    	int rs;
    	
    	/*
    	 * mySQL is weird with dates
    	 * Use this format to add dates so it doesn't think of them as expressions
    	 * '2014-2-14'
    	 * instead of
    	 * 2014-2-14   <---It evaluates that
    	 */
    	
    	/*
    	 * Asychronous reponse when trying to insert pickdate on 1st try. Still inserts however???
    	 */
    	String query = "INSERT INTO rent (pickdate,returnDate,totalRent,tax,confirmationNo,user_id,vehicle_id,pickuploc_id,returnloc_id)VALUES("+"\'"+rent.getPickdate()+"\'"+","+"\'"+rent.getReturnDate()+"\'"+","+rent.getTotalRent()+","+rent.getTax()+","+rent.getConfirmationNo()+","+rent.getUser_id()+","+rent.getVehicle_id()+","+rent.getPickuploc_id()+","+rent.getReturnloc_id()+")";
    	String msg;
    	
    	try{
    		ps = con.prepareStatement(query);
    		rs = ps.executeUpdate();
    		ps.close();
    		msg = "success";
    	}catch(Exception e){
    		e.printStackTrace();
    		msg = "failed";
    	}
    	return msg;
    }
}
