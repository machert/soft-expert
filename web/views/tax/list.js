import Tax from '../../services/tax.js'

export default {
    name: 'Tax',

    setup() {    
        const {onMounted, ref } = Vue;
        const data = ref([]);
        const title = 'Tax'

        onMounted( async () => {
            try {
                const response = await Tax.get();                
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
            this.$emit("navigate-to", {"page": "tax_create"});
        },
        editPage(tax){
            this.$emit(
                "navigate-to", 
                {
                    "page": "tax_update", 
                    "params": 
                        { 
                            "tax": tax
                        }
                });
        },
        
        listTaxProductPage(tax_id){
            this.$emit(
                "navigate-to", 
                {
                    "page": "tax_product_type", 
                    "params": 
                        { 
                            "tax_id": tax_id
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
                                        <th scope="col">Name</th>
                                        <th scope="col">Taxes Values</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(tax, index) in data" :key="index">
                                        <th scope="row">{{ tax.id }}</th>
                                        <td>{{ tax.name }}</td>
                                        <td>
                                            <button type="button" class="btn btn-info rounded-pill" v-on:click="listTaxProductPage(tax.id)">
                                                Show
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-success rounded-pill" v-on:click="editPage(tax)">
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger rounded-pill" v-on:click="deletePage(tax.id)">
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
