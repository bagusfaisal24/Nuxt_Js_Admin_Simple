<template>
<div class="py-8 max-w-full text-gray-700">
    <section class="mb-16 px-3 md:px-8 py-8 bg-white shadow">
      <div class="grid grid-cols-3 gap-4">
          <div class="relative">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="no hp">
          </div>
          <div class="col-span-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Select date">
              </div>
              <div class="relative">
                  <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Select date">
              </div>
              <div class="relative">
                  <div class="mb-4">
                        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="searchPengguna()">Search</button>
                    </div>
              </div>
            </div>
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
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-left font-medium text-gray-800"></div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap" >
                                    <div class="text-left font-medium text-gray-800"></div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-800"></div>
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

export default {
  data(){
    return {
      date: ''
    }
  },
  components: {
  }
}
</script>