<template>
<div>
  <div v-if="login">
   <dashboard-provider>
       <dashboard-layout>
            <Nuxt/>
       </dashboard-layout>
   </dashboard-provider>
  </div>
  <div v-if="!login"><Nuxt/></div>
</div>
</template>
<script>
import DashboardLayout from '@/components/dashboard/Layout.vue'
import DashboardProvider from '@/components/dashboard/provider/Provider.vue'

export default {
  components: { DashboardProvider, DashboardLayout },
  data (){
    return{
      login:false
    }
  },
  created(){
    this.checkingDisability();
  },
  methods: {
    checkingDisability() {
        if(process.browser){
            const stateLogin = window.localStorage.getItem('is_login');
            if(stateLogin !== null || stateLogin)  {
              this.$router.push('/')
              this.login = true
            } else {
              this.$router.push('/login')
              this.login = false
            }
        } else {
            this.login = false
            this.$router.push('/login')
        }
    },
  }
}
</script>
