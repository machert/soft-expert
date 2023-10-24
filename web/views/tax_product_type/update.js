import TaxProductType from '../../services/tax_product_type.js'
// import Tax from '../../services/tax.js'
import ProductType from '../../services/product_type.js'

export default {
    name: 'Update TaxProductType',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup() {     
        const {ref, onMounted} = Vue;   
        const title = 'Update TaxProductType'

        const id = ref(0);
        const tax_id = ref(0);
        const product_type_id = ref(0);
        const value = ref(0);

        const product_types = ref([])
        // const taxes = ref([]) 
        
        // const Update = async (product_type_id, value) => {
        //     try {
        //         const params = {
        //             // 'tax_id' : this.tax_id,
        //             'product_type_id': product_type_id.value,
        //             'value' : value,
        //             'id' : id.value,
        //             'tax_id' : tax_id.value
        //         } 

        //         const response = await TaxProductType.put(params);
        //         if (response?.data?.status == 201) {                
        //             emit("navigate-to", {"page": "tax_product_type", "params": { "tax_id" : tax_id.value}});
        //         }else{
        //             alert('Ocorreu um problema ao inserir as tarifas');
        //         }
        //     } catch (error) {
        //         alert('Ocorreu um problema ao inserir as tarifas');
        //         console.error('error', error);
        //     }
        // }
        
        onMounted( async () => {
            try {
                
                // id.value = props.params.tax_product_type.id ?? 0;
                // tax_id.value = props.params.tax_product_type.tax_id ?? 0
                // product_type_id.value = props.params.tax_product_type.product_type_id ?? 0
                // value.value = props.params.tax_product_type.value ?? 0

                // console.log('params', this.params ?? null);
                
                // const response_taxes = await Tax.get();
                // if (response_taxes?.status == 200) {
                //     taxes.value = response_taxes.data;
                //     console.log(taxes.value)
                // }else{
                //     alert('Ocorreu um problema ao realizar o carregamento da página');
                // }
                
                const response_product_types = await ProductType.get();
                if (response_product_types?.status == 200) {
                    product_types.value = response_product_types.data;
                }else{
                    alert('Ocorreu um problema ao realizar o carregamento da página');
                }


            } catch (error) {
                alert('Ocorreu um problema ao realizar o carregamento da página');
                console.error('error', error);
            }

        })

        return {title, product_types}
    }, 
    
    async created() {
        try { 
            this.id = this.params.tax_product_type.id ?? 0;
            this.tax_id = this.params.tax_product_type.tax_id ?? 0
            this.product_type_id = this.params.tax_product_type.product_type_id ?? 0
            this.value = this.params.tax_product_type.value ?? 0
        } catch (error) {
            alert('Ocorreu um problema ao carregamento da página');
            console.error('error', error);
        }
    },

    methods: {
        async Update(){
            try {
                const params = {
                    // 'tax_id' : this.tax_id,
                    'product_type_id': this.product_type_id,
                    'value' : this.value,
                    'id' : this.id
                } 

                const response = await TaxProductType.put(params);
                if (response?.data?.status == 200) {                
                    this.$emit("navigate-to", {"page": "tax_product_type", "params": { "tax_id" : this.tax_id}});
                }else{
                    alert('Ocorreu um problema ao inserir as tarifas');
                }
            } catch (error) {
                alert('Ocorreu um problema ao inserir as tarifas');
                console.error('error', error);
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
                            <h5 class="card-title">Update new TaxProductType</h5>
                            <form class="row g-3" action="" @submit.prevent="Update(product_type_id, value)" >
                            
                                <div class="col-6"> 
                                    
                                    <div class="col-12">
                                        <label for="product_type" class="form-label">Product Type</label>
                                        <select class="form-select" id="product_type" name="product_type_id" v-bind:value="product_type_id" required>
                                            <option value="">Choose a product type</option>
                                            <option v-for="product_type in product_types" :key="product_type.id" :value="product_type.id">
                                                {{ product_type.id }} - {{ product_type.name }}
                                            </option>
                                        </select>
                                    </div>

                                    
                                    <div class="col-12 g-3">
                                        <label for="value" class="form-label">Value</label>
                                        <input type="number" step="0.01" class="form-control" id="value" v-bind:value="value" required>
                                    </div>

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