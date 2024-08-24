import { Response } from "express";

//HTTP Response Manager
const handleHttp = (res: Response, status: Number) => {
    if(status == 200) {     
        res.status(200).send({
            message: "OK",
        });
    }
    else if(status == 201) {     
        res.status(201).send({
            message: "Created",
        });
    }
    else if(status == 204) {   
        res.status(204).send({
            message: "No content",
        });
    }
    else if(status == 401) {  
        res.status(401).send({
            message: "Unauthorized",
        });
    }
    else if(status == 404) {     
        res.status(404).send({
            message: "Not Found",
        });
    }
    else if(status == 409) {     
        res.status(409).send({
            message: "Conflict",
        });
    }
    else if(status == 423) {     
        res.status(423).send({
            message: "Locked",
        });
    }
    else if(status == 500) {     
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
    else {
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

export { handleHttp };
