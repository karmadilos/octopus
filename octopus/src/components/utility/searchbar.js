import React from 'react';

export default function SearchBar({setSearch}) {

    function onChange(e) { 
        setSearch({search: e.target.value})
    }

    return(
        <div className="col-8">
            <div className="container">
                <div className="row" >
                    <div className="col-8">
                        <input type="text" className="form-control" placeholder="Enter Name" id="username" onChange={onChange}></input>
                    </div>
                    <div className="col-4">
                    </div>
                </div>
            </div>
        </div>
    )
}