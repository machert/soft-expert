import homepage from './views/home.js'
import * as menu from './views/index.js'
import * as subPages from './views/subPages.js'

export default {
    name: 'App',
    components: Object.assign({homepage}, menu, subPages),

    setup() {
        const {watchEffect, ref} = Vue;
        const page = ref(null);
        const params = ref(null);
        
        //url management
        watchEffect(() => {
            const urlpage = window.location.pathname.split("/").pop();
            if (page.value == null) {page.value = urlpage}
            if (page.value != urlpage) {
                const url = page.value ? page.value : './'; 
                //window.history.pushState({url: url}, '', url);
                window.history.pushState(url, '', url);
            }

            window.onpopstate = function() {
                page.value = window.location.pathname.split("/").pop()
            }; 
        })
        
        return {page, menu, params}
    },
    methods: {
        navigateToNewPage(params) {
            this.page = params.page;
            if(params.error_message){
                alert(params.error_message)
            }else{
                this.params = params.params ?? null;
            }
        }
    },

      
    template: `
        <header id="header" class="header fixed-top d-flex align-items-center">

            <div class="d-flex align-items-center justify-content-between">
                <a href="./index.html" class="logo d-flex align-items-center">
                    <img src="https://www.softexpert.com/wp-content/webp-express/webp-images/uploads/2021/03/logo-rodape.png.webp" alt="">
                </a>
                <i class="bi bi-list toggle-sidebar-btn" ></i>
            </div>

        </header> 

        <aside id="sidebar" class="sidebar" >
      
          <ul class="sidebar-nav" id="sidebar-nav">       
            <li class="nav-heading">menu</li>                  
            <li class="nav-item" v-for="item, index in menu" key="item.name">
              <button class="nav-link collapsed w-100" v-on:click="page = index">
                <span>{{ item.name }}</span>
              </button>
            </li>
      
          </ul>
      
        </aside>
        
        <main id="main" class="main">
            <component :is="page || 'homepage'" v-on:navigate-to="navigateToNewPage" :params="params" ></component>
        </main> 

        `,
  };