<template>
<div>
 <v-data-table
    :headers="headers"
    :items="loadedorder"
    :sort-by="['deliverystatus']"
    :sort-desc="[false, true]"
    multi-sort
    class="elevation-1" :loading="isloading" loading-text="Loading... Please wait" 
    id="table2"
  >
     <template v-slot:item.action="{ item }">
      <v-chip @click="$router.push('/admin/order/'+item.id)" color=blue>Details >></v-chip>
    </template>
    {{loadedorder}}
  </v-data-table>
  <v-btn @click="jtosheet1">Get Orderlist as Excel Sheet</v-btn>
  </div>
</template>
<script>
import axios from 'axios'
import XLSX from 'XLSX'
export default {
        asyncData(context) {
    return axios.get("https://stecomlikepos.firebaseio.com/order.json")
                    .then((res) => {
                        let orderarray = []
                        for (const key in res.data) {
                            orderarray.push({...res.data[key], id: key })
                                //console.log(productarray)
                        }
                        //return {loadedorder}
                        
                        context.store.commit('setorder', orderarray)
                    })
                    .catch((e) => { console.log(context.error(e)) })
        
    },
    computed: {
        loadedorder(){
            return this.$store.getters.loadedorder
            
        }
    },
      data () {
      return {
        headers: [
          {
            text: 'Order Status',
            align: 'left',
            value: 'deliverystatus',
          },
          { text: 'Customer Name', value: 'name' },
          { text: 'Phone Number', value: 'phno' },
          { text: 'Address', value: 'address' },
          { text: 'Email', value: 'email' },
          { text: 'Order Date', value: 'date' },
          { text: 'Total Item', value: 'totalitem' },
          { text: 'Total Price', value: 'totalprice' },
          { text: 'Payment Type', value: 'paymenttype' },
          { text: '',value:'action'},
        ],
        isloading:false
        
      }
    },
    methods: {
        jtosheet1(){
        let workbook = XLSX.utils.table_to_book(document.getElementById('table2'));
        console.log(workbook)
        //XLSX.writeFile(workbook, 'out.xlsb')
        let wopts = { bookType:'xlsx', bookSST:false, type:'array' };

        let wbout = XLSX.write(workbook,wopts);

        saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
      },
    },
}
</script>