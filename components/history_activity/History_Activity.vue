<template>
    <div class="py-8 max-w-full text-gray-700">
        <section class="mb-16 px-3 md:px-8 py-8 bg-white shadow">
       <div class="grid grid-cols-3 gap-4">
          <div class="relative">
              <label>Username or No Polis</label>
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
      <div class="grid grid-rows-2 grid-flow-col gap-0">
      <div class="grid grid-cols-3 gap-4">
          <div class="relative">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="keyActivity" placeholder="Username or No Polis">
          </div>
          <div class="col-span-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="start_date" placeholder="Select date">
              </div>
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="end_date" placeholder="Select date">
              </div>
            </div>
          </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
         <div class="mb-3 xl:w-70">
            <select class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                v-model="selectedOption"
                 aria-label="Default select example">
                    <option :value="null" disabled>-- Please select an Type Activities --</option>
                    <option v-for="(opt,i) in options" :key="i" :value="opt.value">{{opt.text}}</option>
            </select>
        </div>
          <div class="col-span-2">
              <div class="relative">
                  <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchHistoryActivity()">Search</button>
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
                                    <div class="font-semibold text-left">Activity Date</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Activity</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Process ID</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Flag Error</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Details</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="(obj,i) in historyActivity" :key="i">
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-left font-medium text-gray-800">{{obj.activity_date}}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap" >
                                    <div class="text-left font-medium text-gray-800">{{obj.process_name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap" >
                                    <div class="text-left font-medium text-gray-800">{{obj.process_id}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div v-if="obj.flag_error" :class="{'text-red-800':obj.flag_error}">
                                        errorr!!
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                 <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">Details</button>
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
      historyOtp:null,
      keyActivity:null,
      selectedOption:null,
      options:null,
      historyActivity:null
    }
  },
  created(){
      this.checkingDisability();
      this.getConfigProcess();
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
    searchHistoryActivity () {
      this.isLoading();
      const data = {
        key: this.keyActivity,
        process_id: this.selectedOption,
        start_date: this.start_date,
        end_date: this.end_date
      }
      console.log(this.selectedOption)
      DataSvc.findHistoryActivity(data, this.token)
        .then((res) => {
          this.isLoading();
          if(res.data.error){
            this.historyError = true;
            this.message_error = res.data.message;
            this.makeToast(this.message_error);
          } else if(res.data.data.history.length === 0){
            this.historyError = true;
            this.historyActivity = [];
            this.message_error = 'data not found';
            this.makeToast(this.message_error);
          }else{
            this.historyError = false;
            this.historyActivity = res.data.data.history
          }
        })
    },
    getConfigProcess () {
      DataSvc.getConfigProcess(this.token)
        .then((res) => {
          this.options = res.data.data.data;
          this.options.map(v => {
             v.value = v.id;
             v.text = v.name;
             return v;
          });
          const all = {
            value: -1,
            text: 'ALL'
          };
          this.options.splice(0, 0, all);
        }).catch((err) => {
          if (typeof err.response !== 'undefined') {
            if(err.response.status === 500){
              this.makeToast("System under maintenance");
            }
          }
        });
    }
  }
}
</script>