<script >
export default{
  name: 'HomeView',
  data() {
    return {
      restaurantes: [],
      restauranteSelecionado: null,
      buscar: "",
      carregando: false,
      showModal: false,
      visible: false,
      timeout: null
    };
  },
  mounted() {
    this.fetchRestaurantes();
  },
  methods: {
     async fetchRestaurantes() {
       this.carregando = true;

       const params = {
         filtro: this.buscar
       };

       await this.axios.get(`${import.meta.env.VITE_API_URL}/Restaurante`, {params})
           .then((response) => {
             this.restaurantes = response.data;
           })
           .catch((error) => {
             console.error('Erro ao buscar restaurantes:', error);
           })
           .finally(() => {
             this.carregando = false;
           });
     },
    abrirModal(restaurante){
     console.log(restaurante.horario_funcionamento);
    }
  },
  watch:{
    buscar: {
      handler() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {

          this.fetchRestaurantes();
        }, 500);
      },
      immediate: true
    }
  }
}

</script>

<template>
  <div>

    <div class="flex justify-content-center flex-wrap">
      <img src="../../public/img/comerbemlogo.png" style="width: 15%"/>
    </div>



    <div class="field grid ml-3 ">
      <Button class="btninto" icon="pi pi-bars" @click="visible = true" />
      <div class="col-10">
        <InputText  class="mr-2"  v-model="buscar" placeholder="Buscar"/>
        <Tag class="mr-1" severity="secondary" value="Secondary" rounded></Tag>
        <Tag severity="secondary" value="Secondary" rounded></Tag>
      </div>
    </div>


    <div v-if="carregando" class="card flex justify-center">
      <Progressspinner />
    </div>

    <div class="grid m-1">
      <div v-for="restaurante in restaurantes" :key="restaurante.id" class="col flex-grow-0 min-h-full">
        <Card class="min-h-full restaurante-card"   style="width: 15rem; overflow: hidden" @click="abrirModal(restaurante)" >
          <template #header>
            <img :src="restaurante.imagem || '../../public/img/imgfundologin.jpg'" />
          </template>
          <template #title>{{ restaurante.nome }}</template>
          <template #subtitle>{{ restaurante.descricao }}</template>
          <template #content>
            <p class="m-0">{{ restaurante.endereco }}</p>
            <p class="m-0">{{ restaurante.horario_funcionamento }}</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-end">
              <div class="card flex justify-end">
                <Rating v-model="restaurante.avaliacao" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>


    <Drawer v-model:visible="visible">
      <template #header>
        <div class="flex items-center gap-2">
          <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
          <span class="font-bold">Amy Elsner</span>
        </div>
      </template>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <template #footer>
        <div class="flex items-center gap-2">
          <Button label="Account" icon="pi pi-user" class="flex-auto" outlined></Button>
          <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text></Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
<style scoped>
img{
  width: 100%
}
.restaurante-card:hover {
  transform: scale(1.20);
}

.restaurante-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}
.btninto{
  background-color: #eca457;
  border-color: #eca457;
  color: black
}
</style>
