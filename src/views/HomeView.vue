<script >
export default{
  name: 'HomeView',
  data() {
    return {
      restaurantes: [],
      buscar: '',
    };
  },
  mounted() {
    this.fetchRestaurantes();
  },
  methods: {
    fetchRestaurantes() {
      this.axios.get(`${import.meta.env.VITE_API_URL}/Restaurante`)
          .then((response) => {
            this.restaurantes = response.data;
          })
          .catch((error) => {
            console.error('Erro ao buscar restaurantes:', error);
          });
    },
    abrirModal(){
      alert("aaaaa");
    }
  }
}

</script>

<template>
  <div>
    <div class="card border-gray-200">
      <div class="col-12">
        <InputText class="col-12" v-model="buscar" placeholder="Buscar"/>
      </div>
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
</style>
