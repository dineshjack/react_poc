
import axios from 'axios'

export const loadData = async () => {
    //let payload = {};
    try {
        const res = await axios.get('/api/user');
        return res.data;

    } catch (err) {
        console.error(err.message);
        return err.message;
    }
}

export const registerUser = async (data) => {
    
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify(data);
    try {
        const res = await axios.post('/api/user',body,config);
        console.log(res)
        return res.data;

    } catch (err) {
        console.error(err.message);
        return err.message;
    }
}

export const deleteUser = async (id) => {
    
    // const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };
      
    try {
        const res = await axios.delete(`/api/user/${id}`);
        console.log(res)
        return res.data;

    } catch (err) {
        console.error(err.message);
        return err.message;
    }
}

export const userById = async (id) => {
    //let payload = {};
    try {
        const res = await axios.get(`/api/user/${id}`);
        return res.data;

    } catch (err) {
        console.error(err.message);
        return err.message;
    }
}