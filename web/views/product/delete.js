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
                this.$emit("navigate-to", {"page": "product", "error_message" : "Ocorreu um problema ao deletar o imposto"});
            }
        } catch (error) {
            this.$emit("navigate-to", {"page": "product", "error_message" : error});
        }
    },

    template: `
    `,
}
