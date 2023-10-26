
import SaleProduct from '../services/sale_product.js'
import Product from '../services/product.js';

export default {
    name: 'Create SaleProduct',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup(props, { emit }) {     
        const {ref, onMounted} = Vue;   
        const title = 'Create SaleProduct'
        
        const sale = ref(null);
        const products = ref([]);
        const sale_products = ref([])

        const product_id = ref(null);
        const quantity = ref(null);


        const CreateSaleProduct = async () => {
            try {
              console.log(sale.value, sale.value.id, product_id.value, quantity.value);
              const params = {
                'sale_id': sale.value.id,
                'product_id': product_id.value,
                'quantity': quantity.value
              }
              
              const response = await SaleProduct.store(params);
              if (response?.status == 200) {
                const params = {
                  'sale_id' : sale.value.id
                }
                
                const responseSales = await SaleProduct.selectSaleResult(params);
                if (responseSales?.status == 200) {
                  sale_products.value = responseSales.data;
                }

              }else{
                  alert('Ocorreu um problema ao realizar o carregamento da página');
              }

            } catch (error) {
                console.log(error);
            }
        }
        
        onMounted( async () => {
          try {
            sale.value = props?.params?.data[0] ?? null;

            const params = {
              'sale_id' : sale.value.id
            }
            
            const responseSales = await SaleProduct.selectSaleResult(params);
            if (responseSales?.status == 200) {
              sale_products.value = responseSales.data;
            }else{
                alert('Ocorreu um problema ao realizar o carregamento da página das vendas');
            }
            
            const response = await Product.get();
            if (response?.status == 200) {
                products.value = response.data;
            }else{
                alert('Ocorreu um problema ao realizar o carregamento da página');
            }

          } catch (error) {
              alert('Ocorreu um problema ao realizar o carregamento da venda');
              console.error('error', error);
          }

      })

        return {title, CreateSaleProduct, product_id, quantity, products, sale_products}
    }, 

    
    async created() {
    },
    
    template: `
        <div>
          <div class="pagetitle">
              <h1>{{ title }}</h1>
          </div>

          <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Create new Sale Product</h5>
                            <form class="row g-3" action="" @submit.prevent="CreateSaleProduct" >
                                <div class="col-12">
                                    <label for="product" class="form-label">Product</label>
                                    <select class="form-select" id="product" name="product_id" v-model="product_id" required>
                                        <option value="">Choose a product</option>
                                        <option v-for="product in products" :key="product.id" :value="product.id">
                                            {{ product.id }} - {{ product.name }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="col-12 g-3">
                                    <label for="quantity" class="form-label">Quantity</label>
                                    <input type="number" step="0.01" class="form-control" id="quantity" v-model="quantity" required>
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
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Sales</h5>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th>Product name</th>
                                        <th>Product value</th>
                                        <th>Quantity</th>
                                        <th>Total value</th>
                                        <th>Total tax value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(sale_product, index) in sale_products" :key="index">
                                        <td scope="row">{{ sale_product.id }}</td>
                                        <td>{{ sale_product.product_name }}</td>
                                        <td>{{ sale_product.product_value }}</td>
                                        <td>{{ sale_product.quantity }}</td>
                                        <td>{{ sale_product.total_value }}</td>
                                        <td>{{ sale_product.total_tax_value}}</td>                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          </section>
        </div>
    `,
};