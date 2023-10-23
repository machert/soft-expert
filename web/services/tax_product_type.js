
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const tax_product_type = {  
    get: async () => {
        
        const params = {
            'type': 'api',
            'route': 'TaxProductTypeController',
            'method': 'index'
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    store: async (_params) => {
        
        const params = {
            'type': 'api',
            'route': 'TaxProductTypeController',
            'method': 'store',
            'params': _params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    
    findByTaxId: async (_params) => {
        
        const params = {
            'type': 'api',
            'route': 'TaxProductTypeController',
            'method': 'findByTaxId',
            'params': _params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    put: async (_params) => {
        
        const params = {
            'type': 'api',
            'route': 'TaxProductTypeController',
            'method': 'put',
            'params': _params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },
    
    delete: async (_params) => {
        
        const params = {
            'type': 'api',
            'route': 'TaxProductTypeController',
            'method': 'delete',
            'params': _params
        };
        
        try {
            const response = await axios.post('http://localhost:8080/', params);
            return response; 
        } catch (error) {
            return [{'error': true}]
        }

    },

} 

export default tax_product_type