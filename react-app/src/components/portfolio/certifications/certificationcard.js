import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
import { Box, useToast, Stack, Button, Input, InputGroup,InputRightElement, Text, ScaleFade } from "@chakra-ui/react"

const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`

export function CertificationInfoCard({user_id}) {
    const [certificationList, setCertificationList] = useState(null)
    const [mode, setMode] = useState('READ')
    const [userdata, setUserdata] = useState({id: "", certification: "", organization: "", date_validate: "" })
    const [list, setList] = useState(null)
    const [dateEnd, setDateEnd] = useState()
    const {id, certification, organization, date_validate}  = userdata;
    var login_id = localStorage.getItem("id")

    console.log(id, date_validate)

    useEffect(() => {
        setUserdata({...userdata, date_validate: formDate(dateEnd)})
    },[dateEnd]);

    function formDate(dateinput) {
        var dateform = new Date(dateinput);
        var year = dateform.getFullYear();
        var month = ("0" + (1 + dateform.getMonth())).slice(-2);
        var day = ("0" + dateform.getDate()).slice(-2);
      
        return year + "-" + month + "-" + day;
      }

    useEffect(() => {
        function GetList(){
            axios.get(`${Url}/certificationsinfo/${user_id}`).then(response =>{
                setList(response.data.result)
            })
        }
        GetList()
    },[user_id]);
    
    useEffect(() => {
        if (list){ setCertificationList(list.map((data) => (
            <div key={data.id} className="card m-3" onClick={function(){setUserdata({id : data.id, certification: data.certification, organization: data.organization, date_validate: formDate(data.date_validate)}); setMode("UPDATE")}} >
                <h5 className="card-header">
                    <span>{data.certification}</span>
                    <span className="m-3">{data.organization}</span>
                    <span className="float-right">{formDate(data.date_validate)}</span>
                </h5>    
            </div>
        )))
        } else{
            setCertificationList(<div></div>)
        }
    },[list])

    const onChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target;
        setUserdata({...userdata, [name]: value});
    }

    function PostData() {
        axios.post(`${Url}/certificationsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }
        
    function PutData() {
        axios.put(`${Url}/certificationsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    function DeleteData() {
        axios.delete(`${Url}/certificationsinfo/${user_id}`,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    if (user_id === login_id){
        return(
                <div>
                        <div className="card-body">
                        {certificationList}
                        {(mode ==="READ") ? (
                            <div className="float-right">
                                <Button colorScheme="teal" variant="ghost" onClick={()=> setMode("CREATE")}>+</Button>
                                <Button colorScheme="teal" variant="ghost" onClick={function(e){setMode("DELETE")}}>-</Button>
                            </div>
                        ):null}
                        {(mode ==="UPDATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header">UPDATE {userdata.certification}
                                        <div className="float-right">
                                            <Button colorScheme="teal" variant="ghost" onClick={function(){PutData(); setMode("READ")}}>edit</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="certification" name ="certification" value={certification} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="organization" name ="organization" value={organization} onChange={onChange}></input>
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date"  selected={dateEnd} onChange={dateEnd => setDateEnd(dateEnd)}  />
                                            </span>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        ):null}
                        {(mode ==="CREATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header"> New Certifications
                                        <div className="float-right">
                                        <Button colorScheme="teal" variant="ghost" onClick={function(){PostData(); setMode("READ")}}>add</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="certification" name ="certification" value={certification} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="organization" name ="organization" value={organization} onChange={onChange}></input>  
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date"  selected={dateEnd} onChange={dateEnd => setDateEnd(dateEnd)}  />
                                            </span>
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
                        {certificationList}
                    </div>
                </div>
    )}
}



