import TaxProductType from '../../services/tax_product_type.js'
import Tax from '../../services/tax.js'
import ProductType from '../../services/product_type.js'

export default {
    name: 'Create TaxProductType',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup(props, { emit }) {     
        const {ref, onMounted} = Vue;   
        const title = 'Create TaxProductType'

        const tax_id = ref(0);
        const product_type_id = ref(0);
        const value = ref(0);

        const product_types = ref([])
        // const taxes = ref([])

        const Create = async (product_type_id, value) => {
            try {
                const params = {
                    'tax_id' : tax_id.value,
                    'product_type_id': product_type_id,
                    'value' : value
                } 

                const response = await TaxProductType.store(params);
                if (response?.data?.status == 201) {                
                    emit("navigate-to", {"page": "tax_product_type", "params": { "tax_id" : tax_id.value}});
                }else{
                    alert('Ocorreu um problema ao inserir as tarifas');
                }
            } catch (error) {
                alert('Ocorreu um problema ao inserir as tarifas');
                console.error('error', error);
            }
        }
        
        onMounted( async () => {
            try {

                tax_id.value = props.params.tax_id ?? 0;

                if(!tax_id.value){
                    alert('Ocorreu um problema ao realizar o carregamento da página');
                }
                
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

        return {title, product_types, Create}
    }, 

    methods: {
        
        
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
                            <h5 class="card-title">Create new TaxProductType</h5>
                            <form class="row g-3" action="" @submit.prevent="Create(product_type_id, value)" >
                            
                                <div class="col-6">
                                    <!--<div class="col-12">
                                        <label for="tax" class="form-label">Tax</label>
                                        <select class="form-select" id="tax" name="tax_id" v-model="tax_id" required>
                                            <option value="">Choose a tax</option>
                                            <option v-for="tax in taxes" :key="tax.id" :value="tax.id">
                                                {{ tax.id }} - {{ tax.name }}
                                            </option>
                                        </select>
                                    </div>-->
                                    
                                    <div class="col-12">
                                        <label for="product_type" class="form-label">Product Type</label>
                                        <select class="form-select" id="product_type" name="product_type_id" v-model="product_type_id" required>
                                            <option value="">Choose a product type</option>
                                            <option v-for="product_type in product_types" :key="product_type.id" :value="product_type.id">
                                                {{ product_type.id }} - {{ product_type.name }}
                                            </option>
                                        </select>
                                    </div>

                                    
                                    <div class="col-12 g-3">
                                        <label for="value" class="form-label">Value</label>
                                        <input type="number" step="0.01"   class="form-control" id="value" v-model="value" required>
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