import React, { useState, useEffect } from 'react';
import { useHistory} from "react-router-dom";
import axios from 'axios';
import { Wrap, WrapItem, Avatar, Box, Grid, Center} from "@chakra-ui/react"

// const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`
const Url = `http://localhost:5000`


export function UserSummaryCard({user_id}) {
    const [userdata, setUserdata] = useState({id: "", email: "", username: "", descriptions:""})
    let history = useHistory();
    
    useEffect(() => {
        function fetchUserprofile(){
            axios.get(`${Url}/userprofile/${user_id}`).then(
                response => {
                    setUserdata(response.data.result)
                    }
            )
        }
        fetchUserprofile();
    },[user_id])
    
    return(
        <Box w="250px" h="300px" m="3" boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden" key={user_id} onClick={() => history.push(`/user/${user_id}`)}>
            <Center>
                <Grid templateColumns="repeat(1, 1fr)" templateRows="repeat(2, 1fr)" spacing={10}>
                    <Center>
                        <Box mt="5" d="flex" alignItems="baseline">
                            <WrapItem>
                                <Avatar size="xl"/>
                            </WrapItem>
                        </Box>
                    </Center>
                    <Center>
                        <Box mt="5">
                            <Box fontWeight="semibold" as="h4" fontSize="2xl" lineHeight="tight" textTransform="uppercase" isTruncated>
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
            </Center>
        </Box>
    )
}


