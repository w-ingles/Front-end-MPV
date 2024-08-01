<script>
export default{
  name: 'RestauranteView',
  props: ['id'],
  data() {
    return {
      restaurante: null,
    };
  },
  mounted() {
    alert("aaa")
    this.fetchRestaurantes();
  },
  methods: {
    async fetchRestaurantes() {

      await this.axios.get(`${import.meta.env.VITE_API_URL}/api/Restaurante/${this.id}`)
          .then((response) => {
            this.restaurante = response.data;
          })
          .catch((error) => {
            console.error('Erro ao buscar restaurantes:', error);
          })
          .finally(() => {
            // this.carregando = false;
          });
    },

  }
}
</script>

<template>
  aaa
<!--  <div>-->
<!--    <h1>{{ restaurante.nome }}</h1>-->
<!--    <img :src=" 'http://127.0.0.1:8000' + restaurante.patch_foto || '../../public/img/imgfundologin.jpg'" />-->
<!--    <p>{{ restaurante.descricao }}</p>-->
<!--    <p>{{ restaurante.endereco }}</p>-->
<!--    <p>{{ restaurante.horario_funcionamento }}</p>-->
<!--    <Rating v-model="restaurante.avaliacao" readonly />-->
<!--  </div>-->
</template>

<style scoped>

</style>