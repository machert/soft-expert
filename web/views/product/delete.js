import Product from '../../services/product.js'

export default {
    name: 'Delete Product',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },

    setup() {    
            
    },  
    
    async created() {
        try {
            const params = {
                'id' : this.params.id
            }
            const response = await Product.delete(params);
            if (response?.data?.status == 204) {                
                this.$emit("navigate-to", {"page": "product"});
            }else{
                alert('Ocorreu um problema ao deletar');
            }
        } catch (error) {
            alert('Ocorreu um problema ao deletar');
            console.error('error', error);
        }
    },

    template: `
    `,
}
