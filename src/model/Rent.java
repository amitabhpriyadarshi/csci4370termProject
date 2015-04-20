package model;

/*
 * Author: Derek Chi
 */
public class Rent {
	
	String id;
	String pickDate;
	String returnDate;
	String totalRent;
	String tax;
	String confirmationNo;
	String userID;
	/* Gotta put the underscore because class is a reserved word */
	String class_;
	String pickupLocID;
	String returnLocID;
	String gps;
	String damageWaiver;
	String insurance;
	String roadsideAssistance;
	String liabilityProtection;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPickDate() {
		return pickDate;
	}
	public void setPickDate(String pickDate) {
		this.pickDate = pickDate;
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
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getClass_() {
		return class_;
	}
	public void setClass_(String class_) {
		this.class_ = class_;
	}
	public String getPickupLocID() {
		return pickupLocID;
	}
	public void setPickupLocID(String pickupLocID) {
		this.pickupLocID = pickupLocID;
	}
	public String getReturnLocID() {
		return returnLocID;
	}
	public void setReturnLocID(String returnLocID) {
		this.returnLocID = returnLocID;
	}
	public String getGps() {
		return gps;
	}
	public void setGps(String gps) {
		this.gps = gps;
	}
	public String getDamageWaiver() {
		return damageWaiver;
	}
	public void setDamageWaiver(String damageWaiver) {
		this.damageWaiver = damageWaiver;
	}
	public String getInsurance() {
		return insurance;
	}
	public void setInsurance(String insurance) {
		this.insurance = insurance;
	}
	public String getRoadsideAssistance() {
		return roadsideAssistance;
	}
	public void setRoadsideAssistance(String roadsideAssistance) {
		this.roadsideAssistance = roadsideAssistance;
	}
	public String getLiabilityProtection() {
		return liabilityProtection;
	}
	public void setLiabilityProtection(String liabilityProtection) {
		this.liabilityProtection = liabilityProtection;
	}
	
}
