import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wrap, WrapItem, Avatar, Box, Grid, Center, Button, Input } from "@chakra-ui/react"


const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`

export function UserProfileCard({user_id}) {
    const[isEditing, setIsEditing] =useState(false)
    const [userdata, setUserdata] = useState({id: "", email: "", username: "", descriptions:""})
    var login_id = localStorage.getItem("id")

    useEffect(() => {
        function fetchUserprofile(){
            axios.get(`${Url}/userprofile/${user_id}`).then(
                response => {
                    setUserdata(response.data.result)
                    }
            )
        }

        fetchUserprofile();
    },[isEditing, user_id])

    const {username, descriptions} = userdata;

    const onChange = (e) => {
      const {value, name} = e.target;
      setUserdata({...userdata, [name]: value});
    }

    function putInfo(e) {
        axios.put(`${Url}/userprofile/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).catch(
            function(error){
            console.log(error)
          })
        setIsEditing(false)
    }

    if (user_id === login_id){
        return(
            <Box flex boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden" >
                <Box p="10" className="container">
                <div className="row">
                    <Center className="col2">
                    <Box d="flex" alignItems="baseline">
                            <WrapItem>
                                <Avatar size="xl"/>
                            </WrapItem>
                        </Box>
                    </Center>
                    <Box className="col2"></Box>
                    <Center className="col8">
                    <Box colSpan={4} m="5">
                        <Box mt="1" fontWeight="semibold" as="h4" fontSize="2xl" lineHeight="tight" textTransform="uppercase" isTruncated>
                            {(isEditing) ? (
                                <Input  type="text" variant="filled" className="form-control" placeholder={userdata.username} name ="username" value={username} onChange={onChange} />
                            ) :
                                <Box mt="1" fontWeight="semibold" as="h4" fontSize="2xl" lineHeight="tight" textTransform="uppercase" isTruncated>
                                    {userdata.username} 
                                </Box>
                            }
                        </Box>
                                
                            {(isEditing) ? (
                                <Input  type="text" variant="filled" className="form-control" placeholder={userdata.email} disabled />
                            ) :
                            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="md" >
                                {userdata.email}
                            </Box>
                            }  
                        <Box d="flex" mt="2" alignItems="center">
                            <Box as="span" color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" textTransform="uppercase">
                                {(isEditing) ? (
                                        <Input  type="text" variant="filled" placeholder={userdata.descriptions} name ="descriptions" value={descriptions} onChange={onChange} />
                                ) :
                                <Box as="span" color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" textTransform="uppercase">
                                    {userdata.descriptions}
                                </Box>
                                }
                            </Box>
                        </Box>
                        <Box>
                        {(isEditing) ? (
                                    <Button colorScheme="teal" size="sm"  onClick={putInfo}>submit</Button>
                                ) :
                                    <Button colorScheme="teal" size="sm" onClick={() => setIsEditing(true)}>edit</Button>
                                }
                        </Box>
                    </Box>
                    </Center>
                </div> 


                </Box>
            </Box>
        )
    }

    else{
        return(
            <Box flex boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Box p="10">
                <Grid templateColumns="repeat(3, 1fr)" spacing={10}>
                    <Center>
                    <Box d="flex" alignItems="baseline">
                        <WrapItem>
                            <Avatar size="xl"/>
                        </WrapItem>
                    </Box>
                    </Center>
                    <Center>
                    <Box colSpan={4} m="5">
                        <Box mt="1" fontWeight="semibold" as="h4" fontSize="2xl" lineHeight="tight" textTransform="uppercase" isTruncated>
                            {userdata.username} 
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="md" >
                            {userdata.email}    
                        </Box>
                        <Box d="flex" mt="2" alignItems="center">
                            <Box as="span" color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" textTransform="uppercase">
                                {userdata.descriptions}
                            </Box>
                        </Box>
                    </Box>
                    </Center>
                </Grid> 
                </Box>
            </Box>
        )
    }

}
