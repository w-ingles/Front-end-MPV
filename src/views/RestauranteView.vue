<script>
export default{
  name: 'RestauranteView',
  props: ['id'],
  data() {

    return {
      restaurantes: null,

    };
  },
  mounted() {
    alert(this.id)
    this.fetchRestaurantes();
  },
  methods: {
    async fetchRestaurantes() {
      this.carregando = true;

      const params = {
        filtro: this.buscar
      };

      await this.axios.get(`${import.meta.env.VITE_API_URL}/api/Restaurante`, {params})
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

  }
}
</script>

<template>
OLA
</template>

<style scoped>

</style>