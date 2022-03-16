import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'; 

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '5b9180585emshae7de7b2a6fe8adp15f531jsn51b73a1f1871',
        }
    });
    return data;
}