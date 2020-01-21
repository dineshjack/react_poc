import React, { useState,useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { deleteUser,userById,loadData,registerUser } from '../actions/user';
import { userContext } from '../context/UserContext';
import Adduser from './Adduser';





function Viewlist(props) {

    const [initialData, setData] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [userData, setUserData] = useState([]);
   
    var initalItems = [];
    
    
    const [actButtn, setactButtn] = useState(initalItems);
    
    const confirmHandler = (type, val) => {
        let updateItems = [...actButtn];
        (type === "open") ? updateItems[val] = false : updateItems[val] = true

        setactButtn(updateItems);

    }

    
  
  
    
  
    const updateData = async id => {
      userById(id).then(res =>{
        setUserData(res);
      })
      
    }
    useEffect(() => {
        loadData().then(res => {
    
          setData(res);
          initalItems = Array(res.length);
          initalItems = initalItems.fill(true);
          setactButtn(initalItems);
          
          
    
        });
      }, [isUpdate])

    const deleteData = (id,index) => {
        deleteUser(id).then(res => {
            setUpdate(!isUpdate);
            actButtn.splice(index, 1);
        });
        
    }

    const submitData = async formData => {

        registerUser(formData).then(res => {
          
        });
        setTimeout( function(){
          setUpdate(!isUpdate)
          setUserData([]);
          
        }, 500 );
        
      }
          if(initialData.length > 0){
          
          }
    return (
        
        <div>

            <h1>Users List</h1>
            <div className="table_scr_div mb-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Location</th>
                            <th>Skills</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {initialData.map((data, index) => {
                            return <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.dob.slice(0, 10)}</td>
                                <td>{data.location}</td>
                                <td>{data.skills.map((skill, idx) => { return <div key={idx} className="skill_box">{skill}</div> })}</td>
                                <td>
                                    {actButtn[index] ?
                                        <div className="act_buttn">
                                            <button onClick={() => updateData(data._id)} className="btn btn-primary">Edit</button>
                                            <button onClick={() => confirmHandler("open", index)} className="btn btn-primary">Delete</button>
                                        </div>
                                        :
                                        <div className="del_tag">
                                            <span className="float-left">Are u sure ?</span>
                                            <button onClick={()=>deleteData(data._id,index)} className="btn btn-dark">Ok</button>
                                            <button onClick={() => confirmHandler("close", index)} className="btn btn-dark">Cancel</button>
                                        </div>
                                    }
                                </td>

                            </tr>
                        })}

                    </tbody>
                </Table></div>
               
                <userContext.Provider value={{isUpdate,setUpdate}}>
                {(Object.values(userData).length > 0) ?
                <Adduser userData={userData} submitData={submitData} />
                :
                <Adduser submitData={submitData}  />
                }
                </userContext.Provider>
        </div>
    )
}

export default Viewlist
