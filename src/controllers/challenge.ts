import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { solve_Challenge, add_ChallengeToUser, get_ItineraryChallenges, get_AllChallenges, get_Challenges, get_Challenge, get_ChallengeCount, add_Challenge, update_Challenge, 
    delete_Challenge, get_HistoryChallenges, get_NotCompletedChallenges } from "../services/challenge"; 

const getAllChallenges = async (req:Request, res:Response) => {
    try{
        const response = await get_AllChallenges();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_CHALLENGES");
    }
};

const getChallenges = async ({params}:Request, res:Response) => {
    try{
        const {pageNumber, nPerPage} = params;
        const response = await get_Challenges(Number(pageNumber), Number(nPerPage));
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_CHALLENGES");
    }
};

const getHistoryChallenges = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_HistoryChallenges(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_HISTORY");
    }
};

const getNotCompletedChallenges = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_NotCompletedChallenges(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_CHALLENGES");
    }
};

const getChallenge = async ({params}:Request, res:Response) => {
    try{
        const {idChallenge} = params;
        const response = await get_Challenge(idChallenge);
        const data = response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, "ERROR_GET_CHALLENGE");
    }
};

const getItineraryChallenges = async ({params}:Request, res:Response) => {
    try{
        const {idItinerary} = params;
        const response = await get_ItineraryChallenges(idItinerary);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_HISTORY");
    }
};

const getChallengeCount = async (req:Request, res:Response) => {
    try{
        const response = await get_ChallengeCount();
        res.send(response.toString());
    } catch(e){
        handleHttp(res, "ERROR_COUNTING_CHALLENGES");
    }
};

const addChallenge = async ({body}:Request, res:Response) => {
    try{
        console.log("1");
        const response = await add_Challenge(body);
        res.send(response);
    } catch(e){
        console.log("2");

        handleHttp(res,"ERROR_POST_CHALLENGE");
    }
};

const updateChallenge = async ({params, body}:Request, res:Response) => {
    try{
        const {idChallenge} = params;
        const response = await update_Challenge(idChallenge, body);
        res.send(response);
    } catch (e){
        handleHttp(res, "ERROR_UPDATE_CHALLENGE");
    }
};

const deleteChallenge = async ({params}:Request, res:Response) => {
    try{
        const {idChallenge} = params;
        const response = await delete_Challenge(idChallenge);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_CHALLENGE");
    }
};

const addChallengeToUser = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idChallenge} = params;
        const response = await add_ChallengeToUser(idUser, idChallenge);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_POST_USER");
    }
};

const solveChallenge = async ({body}:Request, res:Response) => {
    try{
        const {idChallenge, answer, idUser} = body;
        const response = await solve_Challenge(idChallenge, answer, idUser);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_SOLVING_CHALLENGE");
    }
};
export{ getHistoryChallenges, addChallengeToUser, solveChallenge, getNotCompletedChallenges, getItineraryChallenges, getAllChallenges, getChallenges, getChallenge, getChallengeCount, addChallenge, updateChallenge, 
    deleteChallenge };