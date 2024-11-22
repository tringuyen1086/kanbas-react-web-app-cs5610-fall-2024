import React, { useEffect, useState } from "react";
import * as client from "./client"

export default function HttpClient() {
    const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    

    const fetchWelcomeOnClick = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnClick(message);
    };
    
    const fetchWelcomeOnLoad = async () => {
        const welcome = await client.fetchWelcomeMessage();
        setWelcomeOnLoad(welcome);
    };
    useEffect(() => {
        fetchWelcomeOnLoad();
    }, []);
    
    return (
        <div>
        <h3>HTTP Client</h3> <hr />
        <h4>Requesting on Click</h4>
        <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
            Fetch Welcome
        </button> {" "}
        <br />
        <hr />
        
        <h4>Requesting on Load</h4>
        Response from server: <b>{welcomeOnLoad}</b>
        <hr />
        
        Response from server: <b>{welcomeOnClick}</b>
        </div>
    );
}

