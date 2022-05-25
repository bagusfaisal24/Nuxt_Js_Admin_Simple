<template>  
 <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
       <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">VEGA TOOLS</h2>
       <h3 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h3>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label class="sr-only">Username</label>
          <input v-model="username" id="username" name="email" type="text" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="doLogin()">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            username: '',
            password: ''
        }
    },
    created(){
      this.checkingDisability();
    },
    methods:{
       makeToast(error, variant) {
            this.$toast.show({
              type: variant,
              solid: true,
              message: error,
              timeout:false
            })
        },
        doLogin (){
            if(this.username === 'admin' && this.password === 'password'){
                window.localStorage.setItem('token', '123eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJlMWZhNzQwOC1jMGFkLTRkMjQtOGEyNy1kZjgxMjA2YzVlODciLCJzdWIiOiJzdXBhcmphbjAxIiwiaXNzIjoic3VwYXJqYW4wMSIsImlhdCI6MTY0MTg2OTA5OSwiZXhwIjoxNjQxODgzNDk5fQ.pHuQE58ZAkD_ZTHDkn0KFCmMkXRnzbacZiwouHfusaLQXzPXzhd6LAZhlzna9h3v_DJkvqrL2YGvqs0TnOYvrQ');
                window.localStorage.setItem('is_login', true)
                this.$router.push('/')
                window.location.reload(true)
                this.makeToast("login berhasil", 'success');
            } else {
                window.location.reload(true)
                this.makeToast("login gagal", 'danger');
            }
        },
        checkingDisability() {
            if(process.browser){
                const login = window.localStorage.getItem('is_login');
                if(login !== null || login)  this.$router.push('/')
            } else {
               this.$router.push('/login')
            }
        },
    }
}
</script>
