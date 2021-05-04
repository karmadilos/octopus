import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory} from "react-router-dom";
import { Box, useToast, Stack, Button, Input, InputGroup,InputRightElement, Text, ScaleFade } from "@chakra-ui/react"


// const Url = `http://elice-kdt-ai-track-vm-racer-29.koreacentral.cloudapp.azure.com:5000`
const Url = `http://localhost:5000`


//fix button type and margins
export function LoginUser() {
  const toast = useToast()
  const [show, setShow] = useState(false)
  let history = useHistory();
  const [errormsg, setErrormsg] = useState("  ");
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const {email, password} = inputs;

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({...inputs, [name]: value});
  }
  console.log(inputs)
  async function loginUser(e) {
    e.preventDefault();
    await axios.post(`${Url}/login`, inputs).then(
      response => {
        localStorage.setItem('jwt', response.data.access_token);
        localStorage.setItem('id', response.data.result);
        var login_id = response.data.result;
        history.push(`/user/${login_id}`);
        toast({
          title: "Login Success",
          description: "Find people and Show Your Self .",
          position: "top",
          status: "success",
          duration: 1500,
          isClosable: true,
        })
      }
    ).catch(function(error){
      setErrormsg(error.response.data.result.error)
      toast({
        title: "Login Success",
        description: error.response.data.result.error,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <Box bg="white" boxShadow="2xl" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
          <Stack>
            <Input placeholder="Enter email" size="md" name ="email" value={email} onChange={onChange} />
            <InputGroup size="md">
              <Input pr="5rem" type={show ? "text" : "password"} placeholder="Enter password"
                name ="password" value={password} onChange={onChange}/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={()=>{setShow(!show)}}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button colorScheme="blue" size="md" type="submit"onClick={loginUser}>Login</Button>
            <Button colorScheme="blue" size="md" onClick={()=>{toast({
                title: "Not Valid Access",
                description: "Google log in is not available yet",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: true,
              })}}>Login with Google Account</Button>
            <Link style={{display: 'flex', justifyContent: 'center'}}to="/register"><Text fontWeight="semibold" color="green">register</Text></Link>
          </Stack>
      </Box>
    </Box>
    );
}


export function LogoutUser() {
  const toast = useToast()
  let history = useHistory();
  function logoutUser(e) {
    if (localStorage.getItem('jwt') !== null) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('id');
      toast({
        title: "Logout Success.",
        description: "See you again.",
        position: "top",
        status: "success",
        duration: 1500,
        isClosable: true,
      })
      history.push("/");
    } 
  }
  return (
    <div onClick={logoutUser}>Logout</div>
  )

}


export function RegisterUser() {
  const toast = useToast()
  let history = useHistory();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordcheck: '',
    username: ''
  });
  const [iserror, setIserror] = useState(false)
  const [errormsg, setErrormsg] = useState({
    erroremail: '',
    errorpassword: '',
    errorpasswordcheck: '',
    errorusername: '',
  });

  const {email, password, passwordcheck, username} = inputs;

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({...inputs, [name]: value});
    console.log(inputs)
  }

  useEffect(() => {
    setErrormsg({erroremail: '',
      errorpassword: '',
      errorpasswordcheck: '',
      errorusername: '',
    });
  },[iserror]);
  console.log(iserror)
  const {erroremail, errorpassword, errorpasswordcheck, errorusername} = errormsg ;

  function registerUser() {
    axios.post(`${Url}/register`, inputs).then(
      response => {
        toast({
          title: "Registered",
          description: "Login to See other People.",
          position: "top",
          status: "success",
          duration: 1500,
          isClosable: true,
        })
        history.push("/");
      }).catch(function(error){
      var msg = error.response.data.result.error
      if (msg === "fill in the blanks"){
        var errorlst = {erroremail : '', errorpassword : '', errorusername: ''}
        for (var value of error.response.data.result.code){
          errorlst[value] = msg;
        }
        setErrormsg({...errormsg, ...errorlst})
      } else if (msg === "already registered"){
        setErrormsg({...errormsg, erroremail : msg})
      } else if (msg === "email not valid"){
        setErrormsg({...errormsg, erroremail : msg})
      } else if (msg === "password not valid"){
        setErrormsg({...errormsg, errorpassword : msg})
      } else if (msg === "check password"){
        setErrormsg({...errormsg, errorpasswordcheck : msg})
      };
    })
  }
  console.log(errormsg)
  return (
    <Box w = "1000px" bg = "white" opacity="0.85" maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack>
          <Input md="2" type="text" placeholder="Enter Fullname" errorBorderColor="crimson" isInvalid={errorusername !== ''} name ="username" value={username} onChange={onChange}/>
          <small m="2" className="form-text text-muted">{errorusername}</small>
          <Input md="2" type="text" errorBorderColor="crimson" isInvalid={erroremail !== ""} placeholder="Enter Email" name ="email" value={email} onChange={onChange}/>
          <small className="form-text text-muted">{erroremail}</small>
          <Input md="2" type="password" placeholder="Enter Password" errorBorderColor="crimson" isInvalid={errorpassword !== ""} name ="password" value={password} onChange={onChange}/>
          <small className="form-text text-muted">{errorpassword}</small>
          <Input md="4" type="password" placeholder="Enter Check Password" errorBorderColor="crimson" isInvalid={errorpasswordcheck !== ""} name ="passwordcheck" value={passwordcheck} onChange={onChange}/>
          <small className="form-text text-muted">{errorpasswordcheck}</small>
          <Button type="submit" colorScheme="teal" onClick={function(){setIserror(!iserror) ; (registerUser())}}> register</Button>
       </Stack>
      </Box>
    </Box>
  );
}
