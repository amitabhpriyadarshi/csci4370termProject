package model;

/*
 * Author: Derek Chi
 */
public class Rent {
	
	String id;
	String pickdate;
	String returnDate;
	String totalRent;
	String tax;
	String confirmationNo;
	String user_id;
	String vehicle_id;
	String pickuploc_id;
	String returnloc_id;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPickdate() {
		return pickdate;
	}
	public void setPickdate(String pickdate) {
		this.pickdate = pickdate;
	}
	public String getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}
	public String getTotalRent() {
		return totalRent;
	}
	public void setTotalRent(String totalRent) {
		this.totalRent = totalRent;
	}
	public String getTax() {
		return tax;
	}
	public void setTax(String tax) {
		this.tax = tax;
	}
	public String getConfirmationNo() {
		return confirmationNo;
	}
	public void setConfirmationNo(String confirmationNo) {
		this.confirmationNo = confirmationNo;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getVehicle_id() {
		return vehicle_id;
	}
	public void setVehicle_id(String vehicle_id) {
		this.vehicle_id = vehicle_id;
	}
	public String getPickuploc_id() {
		return pickuploc_id;
	}
	public void setPickuploc_id(String pickuploc_id) {
		this.pickuploc_id = pickuploc_id;
	}
	public String getReturnloc_id() {
		return returnloc_id;
	}
	public void setReturnloc_id(String returnloc_id) {
		this.returnloc_id = returnloc_id;
	}
	
	
}
