import ProductType from '../../services/product_type.js'


export default {
    name: 'Update Product Type',
    props: {
        params: {
          type: Object,
          default: () => {}
        }
      },
    
    setup() {        
        const title = 'Update Product Type'
        const name = ''
        const id = 0;
        return {title}
    },
    
    created() {
        this.name = this.params.product_type.name ?? ''
        this.id = this.params.product_type.id ?? 0
    },
      
    methods: {
        async Update(){
            try {
            const params = {
                'name' : this.name,
                'id' : this.id
            }
            const response = await ProductType.put(params);
            if (response?.data?.status == 200) {                
                this.$emit("navigate-to", {"page": "product_type"});
            }else{
                alert('Ocorreu um problema ao inserir o imposto');
            }
        } catch (error) {
            alert('Ocorreu um problema ao inserir o imposto');
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
                            <h5 class="card-title">Update new Product Type</h5>
                            <form class="row g-3" action="" @submit.prevent="Update" >
                                <div class="col-12">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="name">
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