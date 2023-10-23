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
                alert('Ocorreu um problema ao deletar o tipo de produto');
            }
        } catch (error) {
            alert('Ocorreu um problema ao deletar o tipo de produto');
            console.error('error', error);
        }
    },

    template: `
    `,
}
