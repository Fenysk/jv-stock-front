import axios from 'axios';
import { config } from '../config';

export async function getSales(): Promise<any> {
    try {
        const response = await axios.get(`${config.api.url}/sale/get/all`);
        const sales = response.data;

        return sales;
    } catch (error) {
        throw error
    }
}

export async function getSaleById(id: number): Promise<any> {
    try {
        const response = await axios.get(`${config.api.url}/sale/get/${id}`);
        const sale = response.data;

        return sale;
    } catch (error) {
        throw error
    }
}

export async function createSale(sale: any): Promise<any> {
    try {
        const response = await axios.post(`${config.api.url}/sale/create`, sale);
        const newSale = response.data;

        return newSale;
    } catch (error) {
        throw error
    }
}

export async function updateSaleSoldedPrice(id: number, solded_price: number): Promise<any> {
    try {
        const response = await axios.put(`${config.api.url}/sale/update/solded_price/${id}`, { solded_price });
        const updatedSale = response.data;

        return updatedSale;
    } catch (error) {
        throw error
    }
}

export async function deleteSale(id: string): Promise<any> {
    try {
        const response = await axios.delete(`${config.api.url}/sale/delete/${id}`);
        const deletedSale = response.data;
        
        return deletedSale;
    } catch (error) {
        throw error
    }
}