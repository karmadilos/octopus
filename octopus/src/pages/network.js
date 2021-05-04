import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/utility/navigation.js' ;
import { UserSummaryCard} from '../components/user/usersummarycard' ;
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Box, Grid, Wrap, SimpleGrid, Center, GridItem, Text } from "@chakra-ui/react"

import SearchBar from '../components/utility/searchbar';
import img1 from '../components/images/pngwing.com.png'

// const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`
const Url = `http://localhost:5000`

export function NetworkPage() {
    let history = useHistory();
    var [search, setSearch] = useState("")
    var [user, setUser] = useState([])
    var [userlist, setUserlist] = useState(null)

    if (localStorage.getItem("jwt") === null) {
        history.push("/");
      }


    useEffect(() => {
        if(search.search.length >= 2){
            function GetUserList(){
                axios.get(`${Url}/userlist`, {params: search}).then(response =>{
                    setUser(response.data.result)
                    console.log(response.data.result)
                })
            }
            GetUserList()
        }   else{
            function GetUserList(){
                axios.get(`${Url}/userlist`, {params: search}).then(response =>{
                    setUser(response.data.result)
                })
            }
            GetUserList()
        }

    },[search]);

    console.log(search.search)

    useEffect(() => {
        if (user.length !==0){
            setUserlist(user.map((data) => (<div key={data.id}> <UserSummaryCard user_id = {data.id} /> </div>)));
        } else if(search.search.length >= 4){
            setUserlist(<div className="p-10 m-10"><img className="p-10 m-10" src={img1} /></div>)
        }
    }, [user, search]);

    
    return(
        <div> 
            <Navigation />
            <div className="container-fluid justify-content-md-center"> 
                <div className="row justify-content-md-center p-3" >
                    <div className="col-3"></div>
                        <SearchBar setSearch={setSearch}/>
                    <div className="col-1"></div>
                </div>
                <Center>
                    <div className="row ml-5 justify-content-md-start" >
                        {userlist}
                    </div>
                </Center>
            </div>
        </div> 
    )
}
