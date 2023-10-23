import TaxProductType from '../../services/tax_product_type.js'

export default {
    name: 'Delete TaxProductType',
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
                'id' : this.params.tax_product_type.id
            }
            const response = await TaxProductType.delete(params);
            if (response?.data?.status == 204) {
                this.$emit("navigate-to", {"page": "tax_product_type", "params" : {"tax_id" : this.params.tax_product_type.tax_id}});
            }else{
                alert('Ocorreu um problema ao deletar o dado');
            }
        } catch (error) {
            alert('Ocorreu um problema ao deletar o dado');
            console.error('error', error);
        }
    },

    template: `
    `,
}
