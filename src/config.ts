const mode = import.meta.env.MODE;

let url = '';

if (mode === 'development') {
    url = 'http://localhost:3621/api';
} else if (mode === 'production') {
    url = 'https://jv-stock-backend.onrender.com/api';
}

export const api_url = url;