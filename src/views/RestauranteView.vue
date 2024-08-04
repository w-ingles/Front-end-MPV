<script>
export default{
  name: 'RestauranteView',
  props: ['id'],
  data() {
    return {
      restaurante: null,
      carregando: false,
    };
  },
  mounted() {
    this.fetchRestaurantes();
  },
  methods: {
    async fetchRestaurantes() {

      this.carregando = true;

      await this.axios.get(`${import.meta.env.VITE_API_URL}/api/Restaurante/${this.id}`)
          .then((response) => {
            this.restaurante = response.data;
          })
          .catch((error) => {
            console.error('Erro ao buscar restaurantes:', error);
          })
          .finally(() => {
            this.carregando = false;
          });
    },
    voltar() {
      this.$router.go(-1);
    },
  },

}
</script>

<template>
  <div v-if="carregando" class="card flex justify-center">
    <Progressspinner />
  </div>
  <div v-if="restaurante">
    <Button icon="pi pi-angle-left" severity="success" aria-label="Search" @click="voltar"/>
    <div class="flex justify-content-center flex-wrap mt-3">

      <img class="border-circle w-1 pt-0" :src="'http://127.0.0.1:8000' + restaurante.patch_foto || '../../public/img/imgfundologin.jpg'" />

    </div>
    <div class="flex justify-content-center">
      <div class="flex ">

        <p class="mr-2">{{ restaurante.nome }},</p>
        <p class="">{{ restaurante.endereco }},</p>
        <p class="">{{ restaurante.telefone }},</p>
        <p class="">{{ restaurante.horario_funcionamento }}</p>

      </div>
    </div>



    <div class="ml-6">
      <h2 class>Pratos</h2>
    </div>


    <Carousel :value="restaurante.cardapios" :numVisible="4" :numScroll="4">

      <template #item="slotProps">
        <div class="border-1 border-surface-200 dark:border-surface-700  m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img :src="'http://127.0.0.1:8000' + slotProps.data.patch_foto" :alt="slotProps.data.nome" class="w-10" />


            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.nome }}</div>
          <div class="mb-4 font-medium">{{ slotProps.data.descricao }}</div>

          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">R$</div>
            <div class="mt-0 mr-8 font-semibold text-xl">{{ slotProps.data.preco }}</div>

            <span>

                    <Button icon="pi pi-shopping-cart" class="ml-2" outlined/>
                </span>
          </div>
        </div>
      </template>
    </Carousel>

  </div>

</template>

<style scoped>

</style>