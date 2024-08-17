<template>
    <div class="container-fluid">
      <div class="row">
             <h1 class="Products">Projects</h1>
              <div class="row gap-1 justify-content-center" v-if="products?.length" wrapper>
              <Card v-for="product in projects" :key="product.id" >
                  <template #cardHeader>
                        <h2>{{ product.prodName }}</h2>
                  </template>
                  <template #cardBody>
                      <h5 class="card-title">{{ product.prodDescri }}</h5>
                      <h5>{{ product.category }}</h5>
                      <h5>{{ product.amount }}</h5>
                     
                  </template>
              </Card>
          </div>
          <div v-else class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
              </div>
          </div>
      </div>
  
    </div>
    
  </template>
  
  <script>
  import Card from '@/components/Card.vue';
  export default {
      components: {
          Card
      },
      computed: {
          products() {
              return this.$store.state.products
          }
      },
      mounted() {
          this.$store.dispatch('setProducts')
      },
     
  }
  </script>