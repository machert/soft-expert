import TaxProductType from '../../services/tax_product_type.js'

export default {
    name: 'TaxProductType',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },

    setup(props, { emit }) {    
        const {onMounted, ref } = Vue;
        const data = ref([]);
        const title = 'TaxProductType'

        const tax_id = ref(0);

        const newPage = () => {
            emit(
                "navigate-to", 
                {
                    "page": "tax_product_type_create", 
                    "params": 
                        { 
                            "tax_id": tax_id.value
                        }
                });
        }

        onMounted( async () => {
            try {
                tax_id.value = props.params.tax_id ?? 0;
                if(tax_id.value){
                    
                    const params = {
                        'tax_id' : tax_id.value,
                    } 
                    const response = await TaxProductType.findByTaxId(params);                
                    if (response && response.data) {
                        data.value = response.data;
                    }else{
                        alert('Ocorreu um problema ao carregar os dados');
                    }
                }else{
                    const response = await TaxProductType.get();                
                    if (response && response.data) {
                        data.value = response.data;
                    }else{
                        alert('Ocorreu um problema ao carregar os dados');
                    }
                }
            } catch (error) {
                alert('Ocorreu um problema ao carregar os dados');
                console.error('error', error);
            }

        })
            
        return {title, data, newPage}
    },  

    methods: {
        taxPage(){
            this.$emit("navigate-to", {"page": "tax"});
        },
        editPage(tax_product_type){
            this.$emit(
                "navigate-to", 
                {
                    "page": "tax_product_type_update", 
                    "params": 
                        { 
                            "tax_product_type": tax_product_type
                        }
                });
        },
        deletePage(tax_product_type){
            this.$emit(
                "navigate-to", 
                {
                    "page": "tax_product_type_delete", 
                    "params": 
                        { 
                            "tax_product_type": tax_product_type
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
                            <button type="button" class="btn btn-primary rounded-pill mx-3" v-on:click="newPage(tax_id)">
                                New
                            </button>
                            <button type="button" class="btn btn-primary rounded-pill" v-on:click="taxPage">
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Tax</th>
                                        <th scope="col">Product Type</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in data" :key="index">
                                        <th scope="row">{{ row.id }}</th>
                                        <td>{{ row.tax_name }}</td>
                                        <td>{{ row.product_type_name }}</td>
                                        <td>{{ row.value }}</td>
                                        <td>
                                            <button type="button" class="btn btn-success rounded-pill" v-on:click="editPage(row)">
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger rounded-pill" v-on:click="deletePage(row)">
                                                Delete
                                            </button>
                                        </td>
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
