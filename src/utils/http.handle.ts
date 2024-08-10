import { Response } from "express";

//HTTP Response Manager
const handleHttp = (res: Response, status: Number) => {
    if(status == 200) {     
        res.status(200).send({
            message: "OK",
        });
    }
    if(status == 201) {     
        res.status(201).send({
            message: "Created",
        });
    }
    if(status == 204) {     
        res.status(204).send({
            message: "No content",
        });
    }
    if(status == 401) {     
        res.status(401).send({
            message: "Unauthorized",
        });
    }
    if(status == 404) {     
        res.status(404).send({
            message: "Not Found",
        });
    }
    if(status == 409) {     
        res.status(409).send({
            message: "Conflict",
        });
    }
    if(status == 423) {     
        res.status(423).send({
            message: "Locked",
        });
    }
    if(status == 500) {     
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

export { handleHttp };
