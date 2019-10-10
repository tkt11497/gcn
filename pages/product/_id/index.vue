<template>
<p>
    leelr{{loadedproduct}}
</p>
</template>
<script>
import axios from 'axios'
export default {
    asyncData(context) {
    return axios.get('https://stecomlikepos.firebaseio.com/product/'+context.route.params.id+'.json')
    .then((res)=>{
        console.log(res.data)
    return {loadedproduct:res.data}
    }).catch((e)=>{context.error(e);
    console.log(e)
    })
        
    },
}
</script>