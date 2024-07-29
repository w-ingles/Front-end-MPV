<template>
  <Toast/>
  <RouterView />
</template>

<style>
@font-face {
  font-family: 'Electroluxsans'; /* Substitua pelo nome que deseja dar à sua fonte */
  /*src: url('/layout/fonts/Electrolux.otf') format('opentype');*/
  src: url('/layout/fonts/Electroluxsans.woff2') format('woff2');
}

/* Agora você pode usar a fonte no restante do seu estilo */
* {
  font-family: 'Electroluxsans', sans-serif;
}
</style>
<script >
</script>