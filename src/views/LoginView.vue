<template>
  <Toast/>
  <div class="login-body">
    <div class="login-panel"></div>

    <div class="login-content">


      <img src="../../public/img/comerbemlogo.png" />
      <h1><span>LOGIN</span>COMER BEM</h1>
      <p>Maior portal de restaurantes</p>

      <div class="login-input-wrapper">
        <InputText v-model="email" placeholder="Email"/>
        <i class="pi pi-user"></i>
      </div>

      <div class="login-input-wrapper">
        <InputText v-model="password" type="password" placeholder="Senha" />
        <i class="pi pi-lock"></i>
      </div>

      <Button label="Entrar" @click="login" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: 'fred@graodireto.com.br',
      password: '123Fred',
    };
  },
  methods: {
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      // Acesse a variável de ambiente
      console.log(loginData);


      this.axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,loginData)
          .then((response) => {
            if (response.data && response.data.access_token) {
              // Armazene o token de acesso no local storage
              localStorage.setItem('access_token', response.data.access_token);

              // Defina o token como padrão nos headers para futuras requisições
              //this.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

              this.$router.push('/home');
            } else {
              this.$toast.add({ severity: 'warn', summary: 'Falha no login', detail: 'E-mail ou senha incorretos', life: 3000 });
            }
          })
          .catch((error) => {
            this.$toast.add({ severity: 'error', summary: 'Falha no login', detail: 'E-mail ou Senhas incorretas.', life: 3000 });
          });
    },
  },
}
</script>

<style scoped>
.login-body {
  padding: 0;
  margin: 0;
  min-height: 100vh;

  .login-panel {
    display: none;
  }

  .login-content {
    position: fixed;
    padding: 80px 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;

    img {
      display: inline-block;
      margin-bottom: 0px;
      width: 360px;
    }

    h1 {
      font-size: 28px;
      font-weight: 500;
      margin: 14px 0;
      color: #212121FF;

      span {
        color: #727272FF;
      }
    }

    p {
      font-size: 17px;
      color: #727272FF;
      margin: 0 0 32px 0;
    }

    .login-input-wrapper {
      position: relative;
      width: 300px;
      margin-bottom: 24px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;

      input {
        width: 100%;
        padding-right: 16px;
      }

      i {
        position: absolute;
        color: #727272FF;
        font-size: 16px;
        top: 50%;
        right: .429em;
        margin-top: -8px;
      }
    }

    button {
      min-width: 150px;
    }
  }
}

@media screen and (min-width: 768px) {

  .login-body {
    background: url("./img/imgfundologin.jpg");
    background-size: cover;

    .login-panel {
      padding: 80px;
      display: block;
      position: fixed;
      background-color: #ffffff;
      height: 200%;
      width: 85%;
      left: -50%;
      top: -50%;
      border-radius: 50%;
      @include opacity(0.95);
    }

    .login-content {
      text-align: left;
      position: fixed;
      padding: 80px 0 0 80px;

      .login-input-wrapper {
        width: 300px;
        margin-left: 0;
        margin-right: 0;
        text-align: left;
      }
    }
  }
}
</style>