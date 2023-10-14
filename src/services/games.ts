import axios from 'axios';
import { api_url } from '../config';

export async function getAllGames(): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/game/get/all`);
        const games = response.data;

        return games;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function getGamesInStock(): Promise<any> {
    try {

        const response = await axios.get(`${api_url}/game/get/stock`);
        const games = response.data;

        return games;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function getGameById(id: number): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/game/get/${id}`);
        const game = response.data;

        return game;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function createGame(game: any): Promise<any> {
    try {
        const response = await axios.post(`${api_url}/game/create`, game);
        const newGame = response.data;

        return newGame;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function updateGame(game: any): Promise<any> {
    try {
        const response = await axios.put(`${api_url}/game/update/${game.id}`, game);
        const updatedGame = response.data;

        return updatedGame;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function deleteGame(id: string): Promise<any> {
    try {
        const response = await axios.delete(`${api_url}/game/delete/${id}`);
        const deletedGame = response.data;

        return deletedGame;
    } catch (error: any) {
        throw error.response.data;
    }
}