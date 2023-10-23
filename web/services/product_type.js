
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const product_type = {  
    get: async () => {
        
        const params = {
            'type': 'api',
            'route': 'ProductTypeController',
            'method': 'index'
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    store: async (post_params) => {
        
        const params = {
            'type': 'api',
            'route': 'ProductTypeController',
            'method': 'store',
            'params': post_params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    put: async (put_params) => {
        
        const params = {
            'type': 'api',
            'route': 'ProductTypeController',
            'method': 'put',
            'params': put_params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    delete: async (delete_params) => {
        
        const params = {
            'type': 'api',
            'route': 'ProductTypeController',
            'method': 'delete',
            'params': delete_params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },

} 

export default product_type