import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Box, useToast, Stack, Button, Input, InputGroup,InputRightElement, Text, ScaleFade } from "@chakra-ui/react"

// const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`
const Url = `http://localhost:5000`


export function EducationCard({user_id}) {
    const [educationList, setEducationList] = useState(null)
    const [mode, setMode] = useState('READ')
    const [userdata, setUserdata] = useState({id: "", school: "", major: "", degree: 0})
    const [list, setList] = useState(null)
    const {id, school, major, degree}  = userdata;
    var login_id = localStorage.getItem("id")

    console.log(id, degree)

    function formDegree(degree){
        if(degree===1){return "Undergraduate"}
        if(degree===2){return "Bachelor"}
        if(degree===3){return "Master"}
        if(degree===4){return "Doctor"}
    }

    useEffect(() => {
        function GetList(){
            axios.get(`${Url}/educationinfo/${user_id}`).then(response =>{
                setList(response.data.result)
            })
        }

        GetList()
    },[user_id]);
    
    useEffect(() => {
        if (list){ setEducationList(list.map((data) => (
            <div key={data.id} className="card m-3" onClick={function(){setUserdata({id : data.id, school: data.school, major: data.major, degree: data.degree}); setMode("UPDATE")}} >
                <h5 className="card-header">
                    <span className="m-3">{data.school}</span>
                    <span className="m-3">Major : {data.major}</span>
                    <span className="float-right">{formDegree(data.degree)}</span>
                </h5> 
            </div>
        )))
        } else{
            setEducationList(<div></div>)
        }
    },[list])

    const onChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target;
        setUserdata({...userdata, [name]: value});
    }

    function PostData() {
        axios.post(`${Url}/educationinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }
        
    function PutData() {
        axios.put(`${Url}/educationinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    function DeleteData() {
        axios.delete(`${Url}/educationinfo/${user_id}`,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    if (user_id === login_id){
        return(
            <div >
                        <div className="card-body">
                        {educationList}
                        {(mode ==="READ") ? (
                            <div className="float-right">
                                <Button colorScheme="teal" variant="ghost" onClick={()=> setMode("CREATE")}>+</Button>
                                <Button colorScheme="teal" variant="ghost" onClick={function(e){setMode("DELETE")}}>-</Button>
                            </div>
                        ):null}
                        {(mode ==="UPDATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header">UPDATE
                                        <div className="float-right">
                                            <Button colorScheme="teal" variant="ghost" onClick={function(){PutData(); setMode("READ")}}>edit</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group m-3">
                                            <div className="m-3">
                                                <Text>Institution name : </Text>
                                                <input type ="text" placeholder="education" name ="school" value={school} onChange={onChange}></input>    
                                            </div>
                                            <div className="m-3">
                                                <input type ="text" placeholder="major" name ="major" value={major} onChange={onChange}></input>  
                                            </div>
                                            <div className="ml-3">
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="1" onChange={onChange} ></input>
                                                <label className="form-check-label">Undergraduate</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="2" onChange={onChange} ></input>
                                                <label className="form-check-label">Bachelor</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="3" onChange={onChange} ></input>
                                                <label className="form-check-label">Master</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="4" onChange={onChange} ></input>
                                                <label className="form-check-label">Doctor</label>
                                            </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        ):null}
                        {(mode ==="CREATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header"> New educations
                                        <div className="float-right">
                                            <Button colorScheme="teal" variant="ghost" onClick={function(){PostData(); setMode("READ")}}>add</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form >
                                        <div className="form-group m-3">
                                            <div className="m-3">
                                                <input type ="text" placeholder="education" name ="school" value={school} onChange={onChange}></input>    
                                            </div>
                                            <div className="m-3">
                                                <input type ="text" placeholder="major" name ="major" value={major} onChange={onChange}></input>  
                                            </div>
                                            <div className="ml-3">
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="1" onChange={onChange} ></input>
                                                <label className="form-check-label">Undergraduate</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="2" onChange={onChange} ></input>
                                                <label className="form-check-label">Bachelor</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="3" onChange={onChange} ></input>
                                                <label className="form-check-label">Master</label>
                                            </span>
                                            <span className="m-3">
                                                <input className="form-check-input" type="radio" name="degree" value="4" onChange={onChange} ></input>
                                                <label className="form-check-label">Doctor</label>
                                            </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ):null}
                        {(mode ==="DELETE") ? (
                            <div className="float-right">
                                <Button colorScheme="teal" variant="ghost" onClick={function(){DeleteData(); setMode("READ")}}>delete last row</Button>
                                <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                            </div>
                        ): null}
                    </div>
                </div>
            )
        } else{
            return(
                <div>
                    <div className="card-body">
                        {educationList}
                    </div>
                </div>
    )}
}
