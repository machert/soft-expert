import Product from '../../services/product.js'
import ProductType from '../../services/product_type.js'


export default {
    name: 'Update Product',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup() {        
        const {onMounted, ref } = Vue;
        const product_types = ref([]);
        const title = 'Update Product'
        const name = ref('')
        const product_type_id = ref('')
        const value = ref('')
        
        onMounted( async () => {
            try {
                const response = await ProductType.get();                
                if (response && response.data) {
                    product_types.value = response.data;
                }else{
                    alert('Ocorreu um problema ao carregar os dados');
                }
            } catch (error) {
                alert('Ocorreu um problema ao carregar os dados');
                console.error('error', error);
            }

        })

        return {title, product_types}
    },
    
    async created() {
        
        this.id = this.params.product.id ?? 0
        this.name = this.params.product.name ?? ''
        this.product_type_id = this.params.product.product_type_id ?? 0
        this.value = this.params.product.value ?? 0
    },
    
    methods: {
        async Create(){
            try {
                const params = {
                    'name' : this.name,
                    'product_type_id' : this.product_type_id,
                    'value' : this.value
                }
                const response = await Product.store(params);
                if (response?.data?.status == 201) {                
                    this.$emit("navigate-to", {"page": "product"});
                }else{
                    alert('Ocorreu um problema ao inserir');
                }
            } catch (error) {
                alert('Ocorreu um problema ao inserir');
                console.error('error', error);
            }
        }
        
    },

    template: `
        <div class="pagetitle">
            <h1>{{ title }} </h1>
        </div>

        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Create new Product</h5>
                            <form class="row g-3" action="" @submit.prevent="Create" >
                                <div class="col-12">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="name">
                                </div>
                                
                                    
                                <div class="col-12">
                                    <label for="product_type" class="form-label">Product Type</label>
                                    <select class="form-select" id="product_type" name="product_type_id" v-model="product_type_id" required>
                                        <option value="">Choose a product type</option>
                                        <option v-for="product_type in product_types" :key="product_type.id" :value="product_type.id">
                                            {{ product_type.id }} - {{ product_type.name }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="col-12">
                                    <label for="value" class="form-label">Value</label>
                                    <input type="number" step="0,01" class="form-control" id="value" v-model="value">
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