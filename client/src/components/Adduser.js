import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";




function Adduser(props) {

 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    skills: [],
    location: ''
  });
  console.log(props.userData);

  const [startDate, setStartDate] = useState(null);
  let subVal = "Submit";
  

  let nameRef = useRef('');
  const emailRef = useRef('');
  const skillsRef = useRef('');
  const locationRef = useRef('');
  const dobRef = useRef('');
  const formRef = useRef('');

  var openTodate = new Date();
  if (props.userData) {
    subVal = "Update"
    nameRef.current.value = props.userData.name;
    emailRef.current.value = props.userData.email;
    openTodate = new Date(props.userData.dob)


    skillsRef.current.value = props.userData.skills.join(',');
    locationRef.current.value = props.userData.location;
  }else{
    
  }

  




  //console.log(dobRef);

  // const onchangeHandler = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // }
  // const dateUpdate = (val) => {
  //   setFormData({ ...formData, "dob": val });

  // }
  const submitForm = (e) => {
    e.preventDefault()
    if (props.userData) {
      formData.id = props.userData._id
    }
    formData.name = nameRef.current.value
    formData.email = emailRef.current.value
    formData.dob = dobRef.current.input.defaultValue === "" ? props.userData.dob : dobRef.current.input.defaultValue
    formData.skills = skillsRef.current.value
    formData.location = locationRef.current.value
    
    props.submitData(formData)
    
    
  }

  return (
    <div className="container">
      <h3>Add user</h3>
      <form onSubmit={submitForm} ref={formRef} >
        <div className="col-sm-5 form-group form-inline mx-auto">
          <label className="col-sm-2" htmlFor="name">Name:</label>
          <div className="col-sm-10">
            <input type="text" ref={nameRef} className="form-control" id="name" placeholder="Enter name" name="name" />
          </div>
        </div>

        <div className="col-sm-5 form-group form-inline mx-auto">
          <label className="col-sm-2" htmlFor="email">Email:</label>
          <div className="col-sm-10">
            <input type="text" ref={emailRef} className="form-control" id="email" placeholder="Enter email" name="email" />
          </div>
        </div>
        <div className="col-sm-5 form-group form-inline mx-auto">
          <label className="col-sm-2" htmlFor="dob">DOB:</label>
          <div className="col-sm-10">
            <DatePicker className="form-control" ref={dobRef} selected={startDate} dateFormat="yyyy-MM-dd" onChange={date => setStartDate(date)} openToDate={openTodate} />
          </div>
        </div>

        <div className="col-sm-5 form-group form-inline mx-auto">
          <label className="col-sm-2" htmlFor="skills">Skills:</label>
          <div className="col-sm-10">
            <input type="text" ref={skillsRef} className="form-control" id="skills" placeholder="Enter skillls comma separate" name="skills" />
          </div>
        </div>
        <div className="col-sm-5 form-group form-inline mx-auto">
          <label className="col-sm-2" htmlFor="email">Location:</label>
          <div className="col-sm-10">
            <input type="text" ref={locationRef} className="form-control" id="location" placeholder="Enter location" name="location" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{subVal}</button>
      </form>
    </div>
  )
}

export default Adduser
