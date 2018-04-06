package app.model;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
public class User_Student extends User {
	
	private String pathologies;
	private String observations;
	private String objective;
	private Date birthday;
	private String telephone;
	private int age;
	private float weigth;
	@OneToOne(fetch=FetchType.EAGER,cascade = {CascadeType.ALL})
	//@Fetch(value = FetchMode.SUBSELECT)
	private MeasuringTable measurements;
	@ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
	@Fetch(value = FetchMode.SUBSELECT)
	private Set<Routine> routines;
	

	public User_Student() {
		super();
	}

	
	public User_Student(String user, String pass, String name,String email,String pat,
			String obs,String obj,Date birth,String tel,int ageS,
			float wS) {
		super(user,pass,name,email);
		this.birthday = birth;
		this.age = Calendar.getInstance().get(Calendar.YEAR) - this.birthday.getYear();
		this.measurements = new MeasuringTable();
		this.objective = obj;
		this.observations = obs;
		this.pathologies = pat;
		this.routines = new HashSet<Routine>();
		this.telephone = tel;
		this.weigth = wS;
		this.setRole(User_Role.Student);
	}


	public void addRoutine(Routine routine) {
		this.routines.add(routine);
	}


	public String getPathologies() {
		return pathologies;
	}




	public void setPathologies(String pathologies) {
		this.pathologies = pathologies;
	}




	public String getObservations() {
		return observations;
	}




	public void setObservations(String observations) {
		this.observations = observations;
	}




	public String getObjective() {
		return objective;
	}




	public void setObjective(String objective) {
		this.objective = objective;
	}




	public Date getBirthday() {
		return birthday;
	}




	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}




	public String getTelephone() {
		return telephone;
	}




	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}


	public int getAge() {
		return age;
	}




	public void setAge(int age) {
		this.age = age;
	}




	public float getWeigth() {
		return weigth;
	}




	public void setWeigth(float weigth) {
		this.weigth = weigth;
	}




	public MeasuringTable getMeasurements() {
		return measurements;
	}




	public void setMeasurements(MeasuringTable measurements) {
		this.measurements = measurements;
	}




	public Set<Routine> getRoutines() {
		return routines;
	}




	public void setRutines(Set<Routine> routines) {
		this.routines = routines;
	}
	
	
	public void addMeasurements(List<Measurement> measurements) {
		this.measurements.addNewMeasurement(measurements);
	}
	
	

}
