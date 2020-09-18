import axios from 'axios';
const getHashURL = "https://localhost:44395/api/Customer/GetHashValue";

export async function GetHashValue(data){
    const response = await axios.post(getHashURL,data);
    return response;
}
