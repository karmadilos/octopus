import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
import { Box, useToast, Stack, Button, Input, InputGroup,InputRightElement, Text, ScaleFade } from "@chakra-ui/react"

const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`

export function ProjectInfoCard({user_id}) {
    const [projectsList, setProjectsList] = useState(null)
    const [mode, setMode] = useState('READ')
    const [userdata, setUserdata] = useState({id: "", project: "", summary: "", date_start:"", date_end:""})
    const [list, setList] = useState(null)
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const {id, project, summary}  = userdata;
    var login_id = localStorage.getItem("id")

    console.log(id,mode)

    function formDate(dateinput) {
        var dateform = new Date(dateinput);
        var year = dateform.getFullYear();
        var month = ("0" + (1 + dateform.getMonth())).slice(-2);
        var day = ("0" + dateform.getDate()).slice(-2);
      
        return year + "-" + month + "-" + day;
      }

    useEffect(() => {
        setUserdata({...userdata, date_start: formDate(dateStart)})
    },[dateStart]);

    useEffect(() => {
        console.log(userdata)
        setUserdata({...userdata, date_end: formDate(dateEnd)})
    },[dateEnd]);

    useEffect(() => {
        function GetList(){
            axios.get(`${Url}/projectsinfo/${user_id}`).then(response =>{
                setList(response.data.result)
            })
        }
        GetList()
    },[user_id]);
    
    useEffect(() => {
        if (list){ setProjectsList(list.map((data) => (
            <div key={data.id} 
                className="card m-3" 
                    onClick={function(e){e.preventDefault(); setUserdata({id : data.id, project: data.project, summary: data.summary, date_start:formDate(data.date_start), date_end:formDate(data.date_end)}); setMode("UPDATE")}}>
                <h5 className="card-header">
                    <span>{data.project}</span>
                    <small className="float-right">{formDate(data.date_start)} ~ {formDate(data.date_end)}</small>
                </h5>  
                <div className="m-3">
                    <span className="m-3">
                        <p>{data.summary}</p>
                    </span>
                </div>
            </div>
        )))
        } else{
            setProjectsList(<div></div>)
        }
    },[list])

    const onChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target;
        setUserdata({...userdata, [name]: value});
    }

    function PostData() {
        axios.post(`${Url}/projectsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }
        
    function PutData() {
        axios.put(`${Url}/projectsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    function DeleteData() {
        axios.delete(`${Url}/projectsinfo/${user_id}`,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    if (user_id === login_id){
        return(
                <div>
                        <div className="card-body">
                        {projectsList}
                        {(mode ==="READ") ? (
                            <div className="float-right">
                                <Button colorScheme="teal" variant="ghost" onClick={()=> setMode("CREATE")}>+</Button>
                                <Button colorScheme="teal" variant="ghost" onClick={function(e){setMode("DELETE")}}>-</Button>
                            </div>
                        ):null}
                        {(mode ==="UPDATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header">UPDATE {userdata.project}
                                        <div className="float-right">
                                            <Button colorScheme="teal" variant="ghost" onClick={function(){PutData(); setMode("READ")}}>edit</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="project" name ="project" value={project} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="description" name ="summary" value={summary} onChange={onChange}></input>  
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date" value={dateStart|| ''} selected={dateStart} onChange={dateStart => setDateStart(dateStart)}  />
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date"  value={dateEnd|| ''} selected={dateEnd} onChange={dateEnd => setDateEnd(dateEnd)}  />
                                            </span>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        ):null}
                        {(mode ==="CREATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header"> New projects
                                        <div className="float-right">
                                        <Button colorScheme="teal" variant="ghost" onClick={function(){PostData(); setMode("READ")}}>add</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="project" name ="project" value={project} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="description" name ="summary" value={summary} onChange={onChange}></input>  
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date" value={dateStart|| ''} selected={dateStart} onChange={dateStart => setDateStart(dateStart)}  />
                                            </span>
                                            <span className="m-3">
                                                <ReactDatePicker dateFormat="yyyy-MM-dd" placeholderText="validation date" value={dateEnd|| ''} selected={dateEnd} onChange={dateEnd => setDateEnd(dateEnd)}  />
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
                        {projectsList}
                    </div>
                </div>
    )}
}