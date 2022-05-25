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
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" v-if="is_loading"/>
             </div>
        </div>
    <div class="grid grid-flow-row auto-rows-max">
        <div class="grid gap-4 grid-cols-2">
            <div>
                <div id="individu-row" v-if="isShowIndividu">
                    <div class="mb-4">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="no polis" v-model="no_polis">
                    </div>
                    <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchPengguna()">Search</button>
                    </div>
                </div>
                <div id="individu-row" v-if="isShowCorporate">
                    <div class="mb-4">
                        <div class="mb-2">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="no polis" v-model="no_polis">
                        </div>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="participant code" v-model="participant_code">
                    </div>
                    <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchPengguna()">Search</button>
                    </div>
                </div>
                <div id="individu-row" v-if="isShowDplk">
                    <div class="mb-4">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="account number" v-model="account_code">
                    </div>
                    <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchPengguna()">Search</button>
                    </div>
                </div>
            </div>
            <div class="container mx-auto" v-if="dataFound">
                <div class="flex justify-center">
                        <table class="table-auto border-separate border border-slate-500" v-if="dataFound">
                                <thead>
                                    <tr>
                                    <th>No Polis</th>
                                    <th>No Hp</th>
                                    <th>Username</th>
                                    <th>ID Simultan</th>
                                    <th>Reg SPAJ</th>
                                    <th>Account DPLK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{{this.pengguna.no_polis}}</td>
                                    <td>{{this.pengguna.no_hp}}</td>
                                    <td>{{this.pengguna.nama_pengguna}}</td>
                                    <td>{{this.pengguna.id_simultan}}</td>
                                    <td>{{this.pengguna.reg_spaj}}</td>
                                    <td>{{this.pengguna.acc_no_dplk}}</td>
                                    </tr>
                                </tbody>
                        </table>
                </div>
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
            token:''
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
        async searchPengguna () {
            this.isLoading();
            const data = {
                type: this.selected,
                no_polis: this.no_polis,
                kode_reg: this.participant_code,
                acc_no: this.account_code
            }
        await DataSvc.findAccount(data, this.token)
            .then((res) => {
            this.isLoading();
            this.pengguna = res.data.data
            if(this.pengguna.error){
                this.dataNotFound = true;
                this.dataFound = false;
                this.makeToast(this.pengguna.message);
            } else {
                this.dataNotFound = false;
                this.dataFound = true;
            }
            console.log(this.pengguna)
            })
        },
        isLoading() {
            this.is_loading = !this.is_loading;
        }
    }
}
</script>