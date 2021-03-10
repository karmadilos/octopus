import React from 'react';
import { Navigation } from '../components/utility/navigation' ;
import { UserProfileCard } from '../components/user/usercard' ;
import { InfoTemplate } from '../templates/infotemplate' ;
import { useHistory } from "react-router-dom";


export function UserinfoPage({match}) {

    let history = useHistory();
    if (localStorage.getItem("jwt") === null) {
      history.push("/");
    }

    return(
        <div borderTop> 
            <Navigation />
            <div className="container-fluid p-3"> 
                <div className="row" >
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <InfoTemplate user_id={match.params.user_id}/>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </div>
    )
}
