import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@chakra-ui/react"

const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`

export function AwardsInfoCard({user_id}) {
    const [awardsList, setAwardsList] = useState(null)
    const [mode, setMode] = useState('READ')
    const [userdata, setUserdata] = useState({id: "", award: "", summary: ""})
    const [list, setList] = useState(null)
    const {id, award, summary}  = userdata;
    var login_id = localStorage.getItem("id")

    console.log(id, mode)

    useEffect(() => {
        function GetList(){
            axios.get(`${Url}/awardsinfo/${user_id}`).then(response =>{
                setList(response.data.result)
            })
        }
        GetList()
    },[user_id]);
    
    useEffect(() => {
        if (list){ setAwardsList(list.map((data) => (
            <div key={data.id} className="card m-3" onClick={function(){setUserdata({id : data.id, award: data.award, summary: data.summary}); setMode("UPDATE")}} >
                <h5 className="card-header">{data.award}</h5>
                <div className="m-3">
                    <span className="m-3">
                        {data.summary}
                    </span>
                </div>
            </div>
        )))
        } else{
            setAwardsList(<div></div>)
        }
    },[list])

    const onChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target;
        setUserdata({...userdata, [name]: value});
    }

    function PostData() {
        axios.post(`${Url}/awardsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }
        
    function PutData() {
        axios.put(`${Url}/awardsinfo/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    function DeleteData() {
        axios.delete(`${Url}/awardsinfo/${user_id}`,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response =>{
                setList(response.data.result)
            })
    }

    if (user_id === login_id){
        return(
                <div>
                        <div className="card-body">
                        {awardsList}
                        {(mode ==="READ") ? (
                            <div className="float-right">
                                <Button colorScheme="teal" variant="ghost" onClick={()=> setMode("CREATE")}>+</Button>
                                <Button colorScheme="teal" variant="ghost" onClick={function(e){setMode("DELETE")}}>-</Button>
                            </div>
                        ):null}
                        {(mode ==="UPDATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header">UPDATE {userdata.award}
                                        <div className="float-right">
                                        <Button colorScheme="teal" variant="ghost" onClick={function(){PutData(); setMode("READ")}}>edit</Button>
                                        <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="award" name ="award" value={award} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="description" name ="summary" value={summary} onChange={onChange}></input>  
                                            </span>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        ):null}
                        {(mode ==="CREATE") ? (
                            <div>
                                <div className="card m-3" >
                                    <h5 className="card-header"> New Awards
                                        <div className="float-right">
                                        <Button colorScheme="teal" variant="ghost" onClick={function(){PostData(); setMode("READ")}}>add</Button>
                                            <Button colorScheme="teal" variant="ghost" onClick={() => {setMode("READ")}}>cancel</Button>
                                        </div>
                                    </h5>
                                    <form className="mt-3">
                                        <div className="form-group">
                                            <span className="m-3">
                                                <input type ="text" placeholder="award" name ="award" value={award} onChange={onChange}></input>    
                                            </span>
                                            <span className="m-3">
                                                <input type ="text" placeholder="description" name ="summary" value={summary} onChange={onChange}></input>  
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
                            {awardsList}
                        </div>
                </div>
    )}
}
