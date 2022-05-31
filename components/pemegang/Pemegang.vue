<template>
  <div class="py-8 max-w-full text-gray-700">
    <section class="mb-16 px-3 md:px-8 py-8 bg-white shadow">
        <div class="flex justify-center">
            <div class="form-check form-check-inline">
                <input v-model="selected" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" value="individu" @change="onChange($event)">
                <label class="form-check-label inline-block text-gray-800">INDIVIDU</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="selected" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" value="corporate" @change="onChange($event)">
                <label class="form-check-label inline-block text-gray-800" >CORPORATE</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="selected" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" value="dplk" @change="onChange($event)">
                <label class="form-check-label inline-block text-gray-800" >DPLK</label>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex justify-center items-center">
                <div  v-if="is_loading" class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"/>
             </div>
        </div>
        <div class="grid grid-flow-row auto-rows-max">
            <div class="grid gap-4 grid-cols-2">
                <div>
                    <div v-if="isShowIndividu" id="individu-row" >
                        <div class="mb-4">
                            <input  v-model="key" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="no polis">
                        </div>
                        <div class="mb-4">
                            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="findPemegang()">Search</button>
                        </div>
                    </div>
                    <div  v-if="isShowCorporate" id="individu-row">
                        <div class="mb-4">
                            <div class="mb-2">
                            <input  v-model="key" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="no polis">
                            </div>
                            <input v-model="participant_code"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="participant code">
                        </div>
                        <div class="mb-4">
                            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="findPemegang()">Search</button>
                        </div>
                    </div>
                    <div  v-if="isShowDplk" id="individu-row">
                        <div class="mb-4">
                            <input v-model="key" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="account number">
                        </div>
                        <div class="mb-4">
                            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="findPemegang()">Search</button>
                        </div>
                    </div>
                </div>
            
            <div class="flex justify-center" v-if="showData">
                <div class="block mb-16 px-3 md:px-8 w-full bg-white shadow">
                    <p class="text-gray-700 text-base mb-4">
                        <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Details</div>
                            </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <td class="p-2 whitespace-nowrap">
                                <textarea
                                v-model="this.detail"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="exampleFormControlTextarea1"
                                rows="3"
                                disabled/>
                            </td>
                        </tbody>
                        </table>
                    </p>
                </div>
                </div>
            </div>
            <div class="container mx-auto">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr >
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">No Polis</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Pemegang</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Username</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">No Hp</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Status Polis</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Flag Register</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Details</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-x divide-gray-100">
                            <tr v-for="(obj,i) in listPemegang" :key="i">
                                <td class="p-2 whitespace-nowrap">
                                   <div class="text-center font-medium text-gray-800">{{obj.mspo_policy_no}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-center font-medium text-gray-800">{{obj.name_pp}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-center font-medium text-green-800">{{obj.username}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-center font-medium text-gray-800">{{obj.no_hp}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-center font-medium text-gray-800">{{obj.status}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div v-if="obj.flag_register">
                                      <button type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">registered</button>
                                    </div>
                                    <div class="text-red-800" v-if="!obj.flag_register">
                                      <button type="button" class="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">not registered</button>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                 <button type="button" class="inline-block px-4 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                 @click="showCardData(obj)">Details</button>
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
            isShowIndividu: false,
            isShowCorporate: false,
            isShowDplk:false,
            isShowIndividuMri:false,
            is_loading: null,
            no_polis: '',
            participant_code:null,
            account_code:null,
            dataFound: false,
            dataNotFound: false,
            selected:null,
            pengguna: {},
            token:'',
            keyPemegang: '',
            selectedPemegang: null,
            detail:null,
            key:null,
            listPemegang:null,
            showData: false
        }
    },
    created(){
        this.checkingDisability()
    },
    methods:{
        onChange (event) {
            if(event.target.defaultValue === 'individu') {
            this.isShowIndividu = true;
            this.isShowCorporate = false;
            this.isShowDplk = false;
            this.isShowIndividuMri = false;
            }
            if(event.target.defaultValue === 'corporate'){
            this.isShowIndividu = false;
            this.isShowCorporate = true; 
            this.isShowDplk = false;
            this.isShowIndividuMri = false;
            }  
            if(event.target.defaultValue === 'dplk') {
            this.isShowDplk = true; 
            this.isShowIndividu = false;
            this.isShowCorporate = false;
            this.isShowIndividuMri = false;
            }
            if(event.target.defaultValue === 'mri') {
            this.isShowDplk = false; 
            this.isShowIndividu = false;
            this.isShowCorporate = false;
            this.isShowIndividuMri = true;
            }
        },
        async findPemegang () {
        this.isLoading();
        const data = {
            key: this.key,
            type:this.selected,
            kode_reg: this.participant_code
        }
        await DataSvc.findPemegang(data, this.token)
            .then((res) => {
            this.isLoading();
            if(res.data.error){
                this.pemegangError = true;
                this.listPemegang = [];
                this.makeToast(res.data.message);
            }else if(res.data.data.lst_pemegang.length === 0){
                this.pemegangError = true;
                this.listPemegang = [];
                this.makeToast("data not found");
            } else {
                this.pemegangError = false;
                this.listPemegang = res.data.data.lst_pemegang;
            }
            })
        },
        showCardData(data){
            if(data != null){
                this.detail = JSON.stringify(data, null, 2);
                this.showData = true;
            }
         },
         makeToast(error) {
            this.$toast.show({
            title: 'Error!!!',
            type: 'danger',
            solid: true,
            message: error
            })
        },
        checkingDisability() {
            if(process.browser){
                 this.token = window.localStorage.getItem('token');
            }
        },
        isLoading() {
            this.is_loading = !this.is_loading;
        }
    }
}
</script>