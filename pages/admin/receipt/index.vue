<template>
<v-container >
  <v-row>
    <v-col md="3" sm="12">
   <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
    </v-col>
  </v-row>
 <v-data-table
    :headers="headers"
    :items="loadedreceipts"
    :sort-by="['deliverystatus']"
    :sort-desc="[false, true]"
    multi-sort 
    :search="search"
    class="elevation-1" :loading="isloading" loading-text="Loading... Please wait" 
    id="table2"
  >
   
  </v-data-table>
  <v-btn @click="jtosheet1">Get Receipts as Excel Sheet</v-btn>
  
</v-container>
</template>
<script>
import axios from 'axios'
import XLSX from 'xlsx'
export default {
  middleware:['checkauth','auth'],
        asyncData(context) {
           return  axios.get("https://stecomlikepos.firebaseio.com/receipts.json")
                    .then((res) =>{ 
                        let loadedreceipts=[] 
                          for (const key in res.data) {
                          loadedreceipts.push({...res.data[key], id: key })   }
                    return{
                        loadedreceipts
                    }
                    }
                    )

                         
                    .catch((e) => { console.log(context.error(e)) })
                    
        
    },
    computed: {
       
    },
      data () {
      return {
        headers: [
          {
            text: 'Date',
            value: 'date',
          },
          { text: 'Total Price', value: 'totalprice' },
          { text: 'Total Item', value: 'totalitem' },
          { text: 'Paid', value: 'paid' },
          { text: 'Change', value: 'change' },
       
        ],
        isloading:false,
        search:''
        
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