import Sale from '../../services/sale.js'
import SaleProductComponent from '../../components/sale_product.js'

export default {
    name: 'Create Sale',
    components: Object.assign({SaleProductComponent}),
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup(props, { emit }) {       
        const {ref, onMounted} = Vue;   

        const title = ref('Create Sale' )
        const id = ref(0);
        const name_customer = ref('')
        let sale = ref(null);
        let show_sale_product = ref(false)
        
        const page_sale_product = ref(null);
        const params_sale_product = ref(null);

        onMounted( async () => {
            try {
                if(props?.params?.sale){
                    sale.value = props.params.sale
                    
                    page_sale_product.value = 'SaleProductComponent'
                    params_sale_product.value = sale.value
                    show_sale_product.value = true;
                }
  
            } catch (error) {
                alert('Ocorreu um problema ao realizar o carregamento da venda');
                console.error('error', error);
            }
  
        })

        return {title, name_customer, show_sale_product, params_sale_product, page_sale_product}
    }, 
    methods: {
        async Create() {
            if(this.id){
                this.Update()
            }else{
                const params = {
                    'name_customer' : this.name_customer,
                } 
                const response = await Sale.store(params);
                if (response?.data?.status == 201) {  
                    this.sale = await Sale.show({'id': response.data.result ?? 0})
                        
                    this.page_sale_product = 'SaleProductComponent'
                    this.params_sale_product = this.sale
                    this.show_sale_product = true;
                }else{
                    alert("Ocorreu um problema ao inserir a venda");
                }
            }
            
        },
        
        async Update() {
            const params = {
                'id': this.id,
                'name_customer' : this.name_customer,
            } 
            const response = await Sale.put(params);
            if (response?.data?.status == 201) {  
                this.sale = await Sale.show({'id': response.data.result ?? 0})
                    
                this.page_sale_product = 'SaleProductComponent'
                this.params_sale_product = this.sale
                this.show_sale_product = true;
            }else{
                alert("Ocorreu um problema ao inserir a venda");
            }
        }
    },

    template: `
        <div class="pagetitle">
            <h1>{{ title }}</h1>
        </div>
        
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Create new Tax</h5>
                            <form class="row g-3" action="" @submit.prevent="Create" >
                                <div class="col-12">
                                    <label for="name_customer" class="form-label">Name Customer</label>
                                    <input type="text" class="form-control" id="name_customer" v-model="name_customer">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary mx-2">Submit</button>
                                    <button type="reset" class="btn btn-secondary">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="show_sale_product">
                <div class="col-lg-12">
                    <component :is="page_sale_product || 'SaleProductComponent'" :params="params_sale_product"></component>
                </div>
            </div>
        </section>
    `,
};