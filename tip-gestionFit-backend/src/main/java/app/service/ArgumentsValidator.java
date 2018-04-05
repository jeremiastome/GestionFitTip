package app.service;

import java.util.Date;

import org.apache.commons.validator.routines.EmailValidator;

import app.model.User;
import app.model.User_Instructor;
import app.model.User_Student;

public class ArgumentsValidator {
	
	public static void isNullOrEmptyString(String... strArr) {
	    for (String st : strArr) {
	        if  (st==null || st.isEmpty())
				throw new IllegalArgumentException("Not a valid string");
	    }
	}
	
	public static void isNegativeInt(Integer... intArr) {
	    for (Integer i : intArr) {
	        if  (i==null || i < 0)
				throw new IllegalArgumentException("Not a valid int");
	    }
	}
	
	public static void isNotAValidMailAddress(String... strArr) {
		isNullOrEmptyString(strArr);
	    
		EmailValidator mailValid = EmailValidator.getInstance();
		
		for (String st : strArr) {
			
	        if  (!mailValid.isValid(st))
				throw new IllegalArgumentException("Not a valid mail");

	    } 
	}
	
	public static void isInvalidFullName(String name) {
		isNullOrEmptyString(name);
		if(name.length() < 4 || name.length() > 50)
			throw new IllegalArgumentException("Not a valid name");

	}
	
	public static void isInvalidTelephone(String number) {
		isNullOrEmptyString(number);
		if( number.length() < 8)
			throw new IllegalArgumentException("Not a valid telephone");

	}
	
	@SuppressWarnings("deprecation")
	public static void isInvalidDate(Date date) {
		int greater = date.compareTo(new Date(1910, 01, 01));
		int less = date.compareTo(new Date(2005,01,01));
		if(greater < 0 || less >0) 
			throw new IllegalArgumentException("Not a valid date");

	}

	public static void validateStudent(User_Student newUser) {
		System.out.println(newUser.getRole());
		User_Student user = newUser;
//		isInvalidDate(user.getBirthday());
		isInvalidFullName(user.getNameAndSurname());
		isInvalidTelephone(user.getTelephone());
		isNullOrEmptyString(user.getObjective(),user.getPassword(),user.getUsername()); 
		isNegativeInt(user.getAge());
		if(user.getWeigth() < 30f)
			throw new IllegalArgumentException("Not a valid weigth");
		
		
	}

	public static void validateInstructor(User user) {
		User_Instructor newUser = (User_Instructor) user;
		isInvalidFullName(newUser.getNameAndSurname());
		isNotAValidMailAddress(newUser.getMail());
		isNullOrEmptyString(newUser.getUsername(),newUser.getPassword());

		
	}

}
