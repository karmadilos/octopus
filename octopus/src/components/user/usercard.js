import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDisclosure,
        Modal, 
        ModalBody,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalCloseButton,
        Lorem,
        ModalFooter,
        Box,
        Button} from "@chakra-ui/react"


// const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`
const Url = `http://localhost:5000`


export function UserProfileCard({user_id}) {
    const [mode, setMode] = useState("READ")
    const [userdata, setUserdata] = useState({id: "", email: "", username: "", descriptions:""})
    const [usercard, setUsercard] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()

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
    },[user_id])

    useEffect(()=> {
        setUsercard(
            <Box>
                usercard
            </Box>
        )
        
    },[userdata])

    const {username, descriptions} = userdata;

    const onChange = (e) => {
      const {value, name} = e.target;
      setUserdata({...userdata, [name]: value});
    }

    function putInfo(e) {
        axios.put(`${Url}/userprofile/${user_id}`, userdata,
            {headers:{Authorization: "Bearer " + localStorage.getItem("jwt")}}
            ).then(response=>{setUserdata(response.data.result)})
    }

    if (user_id === login_id){
        return(
            <Box flex boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden" >
                <Box p="10" className="container">
                </Box>
            </Box>
        )
    }

    else{
        return(
            <Box flex boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Lorem count={2} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </Box>
        )
    }

}
