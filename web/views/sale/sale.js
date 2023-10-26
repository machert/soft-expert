import Sale from '../../services/sale.js'
import SaleProduct from '../../services/sale_product.js'

export default {
    name: 'Sale',

    setup() {        
        const { ref } = Vue;
        const title = 'Sale'
        const name_customer = ref('')

        return {title}
    },
    
    methods: {
        async CreateSale(){
            try {
                const params = {
                    'name_customer' : this.name
                }
                const response = await Sale.store(params);
                if (response?.data?.status == 201) {
                    this.$emit("navigate-to", {"page": "sale"});
                }else{
                    alert('Ocorreu um problema ao inserir a venda');
                }
            } catch (error) {
                alert('Ocorreu um problema ao inserir a venda');
                console.error('error', error);
            }
        },
        
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
        </section>
    `,
};