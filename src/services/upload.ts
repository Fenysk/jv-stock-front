import axios from 'axios';
import { api_url } from '../config';

export async function uploadImage(image: any): Promise<any> {
    try {
        const formData = new FormData();
        formData.append('file', image);
        const response = await axios.post(`${api_url}/files/upload/image`, formData);

        const image_url = response.data.path;

        return image_url;
    } catch (error: any) {
        throw error.response.data;
    }
}