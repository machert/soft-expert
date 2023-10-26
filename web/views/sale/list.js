import Sale from '../../services/sale.js'

export default {
    name: 'Sale',

    setup() {    
        const {onMounted, ref } = Vue;
        const data = ref([]);
        const title = 'Sale'

        onMounted( async () => {
            try {
                const response = await Sale.get();                
                if (response && response.data) {
                    data.value = response.data;
                }else{
                    alert('Ocorreu um problema ao carregar os dados');
                }
            } catch (error) {
                alert('Ocorreu um problema ao carregar os dados');
                console.error('error', error);
            }

        })
            
        return {title, data}
    },  
    
    methods: {
        newPage(){
            this.$emit("navigate-to", {"page": "sale_create"});
        },
        editPage(sale){
            this.$emit(
                "navigate-to", 
                {
                    "page": "sale_create", 
                    "params": 
                        { 
                            "sale": sale
                        }
                });
        },
        
        listSaleProductPage(sale_id){
            this.$emit(
                "navigate-to", 
                {
                    "page": "sale_product", 
                    "params": 
                        { 
                            "sale_id": sale_id
                        }
                });
        },
        
        deletePage(id){
            this.$emit(
                "navigate-to", 
                {
                    "page": "tax_delete", 
                    "params": 
                        { 
                            "id": id
                        }
                });
        }
    },

    template: `
        <div class="pagetitle">
            <h1>{{ title }}</h1>
        </div>
        <section class="section">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Actions</h5>
                            <button type="button" class="btn btn-primary rounded-pill" v-on:click="newPage">
                                New
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name Customer</th>      
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(sale, index) in data" :key="index">
                                        <th scope="row">{{ sale.id }}</th>
                                        <td>{{ sale.name_customer }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>  

                </div>
            </div>
        </section>

    `,
}
