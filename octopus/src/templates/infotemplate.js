import React from 'react';
import { EducationCard } from '../components/portfolio/education/educationcard' ;
import { AwardsInfoCard } from '../components/portfolio/awards/awardcard' ;
import { ProjectInfoCard } from '../components/portfolio/projects/projectcard' ;
import { CertificationInfoCard } from '../components/portfolio/certifications/certificationcard' ;

import { UserProfileCard } from '../components/user/usercard' ;
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading
  } from "@chakra-ui/react"

export function InfoTemplate({user_id}) {
    
    return(
    <div>
        <div className="row m-5">
            <div className="col-6">
                <UserProfileCard user_id={user_id}/>
            </div>
            <div className="col-5">
            </div>
        </div>
        <Box flex boxShadow="base" borderWidth="1px" borderRadius="lg" overflow="hidden" >
        <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left"> <Heading as="h2" size="xl">Educations</Heading></Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <EducationCard user_id={user_id}/>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left"> <Heading as="h2" size="xl">Projects</Heading></Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <ProjectInfoCard user_id={user_id}/>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left"><Heading as="h2" size="xl">Awards</Heading></Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <AwardsInfoCard user_id={user_id}/>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left"><Heading as="h2" size="xl">Certifications</Heading></Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <CertificationInfoCard user_id={user_id}/>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
        </Box>
    </div>
    
    )
}



