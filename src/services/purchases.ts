import axios from 'axios';
import { api_url } from '../config';

export async function getPurchases(): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/purchase/get/all`);
        const purchases = response.data;

        return purchases;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function getPurchaseById(id: number): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/purchase/get/${id}`);
        const purchase = response.data;

        return purchase;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function createPurchase(purchase: any): Promise<any> {
    try {
        const response = await axios.post(`${api_url}/purchase/create`, purchase);
        const newPurchase = response.data;

        return newPurchase;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function updatePurchase(purchase: any): Promise<any> {
    try {
        console.log(purchase)
        const response = await axios.put(`${api_url}/purchase/update/${purchase.id}`, purchase);
        const updatedPurchase = response.data;

        return updatedPurchase;
    } catch (error: any) {
        throw error.response.data;
    }
}

export async function deletePurchase(id: string): Promise<any> {
    try {
        const response = await axios.delete(`${api_url}/purchase/delete/${id}`);
        const deletedPurchase = response.data;

        return deletedPurchase;
    } catch (error: any) {
        throw error.response.data;
    }
}