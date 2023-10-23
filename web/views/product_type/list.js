import ProductType from '../../services/product_type.js'

export default {
    name: 'Product Type',

    setup() {    
        const {onMounted, ref } = Vue;
        const data = ref([]);
        const title = 'Product Type'

        onMounted( async () => {
            try {
                const response = await ProductType.get();                
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
            this.$emit("navigate-to", {"page": "product_type_create"});
        },
        editPage(product_type){
            this.$emit(
                "navigate-to", 
                {
                    "page": "product_type_update", 
                    "params": 
                        { 
                            "product_type": product_type
                        }
                });
        },
        deletePage(id){
            this.$emit(
                "navigate-to", 
                {
                    "page": "product_type_delete", 
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
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product_type, index) in data" :key="index">
                                        <th scope="row">{{ product_type.id }}</th>
                                        <td>{{ product_type.name }}</td>
                                        <td>
                                            <button type="button" class="btn btn-success rounded-pill" v-on:click="editPage(product_type)">
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger rounded-pill" v-on:click="deletePage(product_type.id)">
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
