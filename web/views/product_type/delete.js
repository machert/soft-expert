import ProductType from '../../services/product_type.js'

export default {
    name: 'Delete Product Type',
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
            const response = await ProductType.delete(params);
            if (response?.data?.status == 204) {                
                this.$emit("navigate-to", {"page": "product_type"});
            }else{
                this.$emit("navigate-to", {"page": "product_type", "error_message" : "Ocorreu um problema ao deletar o imposto"});
            }
        } catch (error) {
            this.$emit("navigate-to", {"page": "product_type", "error_message" : error});
        }
    },

    template: `
    `,
}
