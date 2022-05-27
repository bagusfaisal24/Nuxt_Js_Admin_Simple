<template>
<div class="py-8 max-w-full text-gray-700">
    <section class="mb-16 px-3 md:px-8 py-8 bg-white shadow">
         <div class="grid grid-cols-3 gap-4">
          <div class="relative">
              <label>No Hp</label>
          </div>
          <div class="col-span-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="relative">
                <label>Start Date</label>
              </div>
              <div class="relative">
                <label>End Date</label>
              </div>
            </div>
          </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
          <div class="relative">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="no_hp" placeholder="no hp">
          </div>
          <div class="col-span-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="start_date" placeholder="Select date">
              </div>
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="end_date" placeholder="Select date">
              </div>
              <div class="relative">
                  <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchOtp()">Search</button>
                    </div>
              </div>
            </div>
          </div>
      </div>
       <div class="mb-4">
            <div class="flex justify-center items-center">
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" v-if="is_loading"/>
             </div>
        </div>
      <div class="container mx-auto">
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Created Date</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">No Hp</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Status</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="(historyOtp,i) in historyOtp" :key="i">
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-left font-medium text-gray-800">{{historyOtp.create_date}}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap" >
                                    <div class="text-left font-medium text-gray-800">{{historyOtp.no_hp}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div :class="{'text-green-800':historyOtp.status === 'delivered' }">
                                        {{historyOtp.status}}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
    </section>
</div>
</template>
<script>
import DataSvc from '../../service/dataSvc'

export default {
  data(){
    return {
      start_date: this.formatDate(new Date),
      end_date:this.formatDate(new Date),
      no_hp:'',
      is_loading: null,
      historyOtp:null
    }
  },
  created(){
      this.checkingDisability();
  },
  methods: {
    formatDate(date) {
          return date.toISOString().slice(0, 10)
    },
    makeToast(error) {
            this.$toast.show({
            title: 'Error!!!',
            type: 'danger',
            solid: true,
            message: error
        })
    },
    isLoading() {
        this.is_loading = !this.is_loading;
    },
    checkingDisability() {
        if(process.browser){
            this.token = window.localStorage.getItem('token');
        }
    },
    searchOtp () {
      this.isLoading();
      const data = {
        no_hp: this.no_hp,
        start_date: this.start_date,
        end_date: this.end_date
      }
      DataSvc.findHistoryOtp(data, this.token)
        .then((res) => {
          this.isLoading();
          if(res.data.error){
            this.otpError = true;
            this.historyOtp = [];
            this.message_error = res.data.message;
            this.makeToast(this.message_error);
          }else if(res.data.data.history.length === 0){
            this.otpError = true;
            this.historyOtp = [];
            this.message_error = "data not found";
            this.makeToast(this.message_error);
          } else {
            this.otpError = false;
            this.historyOtp = res.data.data.history
            this.historyOtp.map(v =>{
                switch(v.status){
                  case 'delivered':
                  case 'sent':
                    v.color = 'green'
                    break;
                  case 'queued':
                    v.color = 'cyan'
                    break;
                  case 'pending':
                  case 'unsent':
                    v.color = 'warning'
                    break;
                  case 'aborted':
                  case 'failed':
                    v.color = 'danger'
                    break;
                  default:
                    v.color = 'info';
                    v.status = 'undefined'
                }
                return v;
            });
          }
        })
    }
  }
}
</script>