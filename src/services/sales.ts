import axios from 'axios';
import { api_url } from '../config';

export async function getSales(): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/sale/get/all`);
        const sales = response.data;

        return sales;
    } catch (error) {
        throw error
    }
}

export async function getSaleById(id: number): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/sale/get/${id}`);
        const sale = response.data;

        return sale;
    } catch (error) {
        throw error
    }
}

export async function createSale(sale: any): Promise<any> {
    try {
        const response = await axios.post(`${api_url}/sale/create`, sale);
        const newSale = response.data;

        return newSale;
    } catch (error) {
        throw error
    }
}

export async function updateSaleSoldedPrice(sale: any): Promise<any> {
    try {
        const response = await axios.put(`${api_url}/sale/update/solded_price/${sale.id}`, sale);
        const updatedSale = response.data;

        return updatedSale;
    } catch (error) {
        throw error
    }
}

export async function deleteSale(id: string): Promise<any> {
    try {
        const response = await axios.delete(`${api_url}/sale/delete/${id}`);
        const deletedSale = response.data;

        return deletedSale;
    } catch (error) {
        throw error
    }
}