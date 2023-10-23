import Tax from '../../services/tax.js'

export default {
    name: 'Delete Tax',
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
            const response = await Tax.delete(params);
            if (response?.data?.status == 204) {                
                this.$emit("navigate-to", {"page": "tax"});
            }else{
                alert('Ocorreu um problema ao deletar o imposto');
            }
        } catch (error) {
            alert('Ocorreu um problema ao deletar o imposto');
            console.error('error', error);
        }
    },

    template: `
    `,
}
