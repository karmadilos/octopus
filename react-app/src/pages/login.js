import React from 'react'
import { Navigation } from '../components/utility/navigation' ;
import { LoginUser } from '../components/user/users' ;
import { Box, Grid,Center, Text } from "@chakra-ui/react"

export function LoginPage() {

  return (
    <Box w="100%" h="1500px" bgGradient="linear(to-b, rgb(50,150,150),rgb(265,100,100))"> 
        <Navigation />

        <Grid h="200px" templateRows="repeat(5, 1fr)" templateColumns="repeat(1, 1fr)" gap={4}>
          <Box h="100px"></Box>
        <Center>
          <Box>
              <Text bgGradient="linear(to-l, white, lightgray)" bgClip="text" fontSize="3xl" fontWeight="extrabold">
                Welcome to Racer in
              </Text>
          </Box>
        </Center>
        <Center>
          <Box opacity="0.85">
           <LoginUser  />
          </Box>
        </Center>
        </Grid>
    </Box>
  );
}