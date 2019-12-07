import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'
import searchPlugin from 'vuex-search';
const createstore = () => {
    return new Vuex.Store({

        state: {
            loadedproduct: [],
            token: null,
            maximum: 99,
            cart: [],
            show: false,
            loadedorder: [],
            currentloginname: '',
            errormsg:null,
            title:''

        },
        plugins: [
            searchPlugin({
              resources: {
                loadedproduct: {
                  // what fields to index
                  index: ['productdetail', 'productname','productprice'],
                  // access the state to be watched by Vuex Search
                  getter: state => state.loadedproduct,
                  // how resource should be watched
                  watch: { delay: 500 },
                },
                // otherResource: { index, getter, watch, searchApi },
              },
            }),
          ],
        mutations: {
            settitle(state, title) {
                state.title = title
            },
            setproduct(state, product) {
                state.loadedproduct = product
            },
            setorder(state, order) {
                state.loadedorder = order
            },
            addproduct(state, product) {
                state.loadedproduct.push(product)
            },
            addorder(state, order) {
                state.loadedorder.push(order)
            },
            updateproduct(state, updatedproduct) {
                const productindex = state.loadedproduct.findIndex(
                    product => product.id === updatedproduct.id
                );


                state.loadedproduct[productindex] = updatedproduct

            },
            updateorder(state, updatedorder) {
                const orderindex = state.loadedorder.findIndex(
                    order => order.id === updatedorder.id
                );


                state.loadedorder[orderindex] = updatedorder

            },
            deleteproduct(state, deletedproduct) {
                const productindex = state.loadedproduct.findIndex(
                    product => product.id === deletedproduct.id
                );


                state.loadedproduct.splice(productindex, 1)
            },
            deleteorder(state, deletedorder) {
                const orderindex = state.loadedorder.findIndex(
                    order => order.id === deletedorder.id
                );


                state.loadedorder.splice(orderindex, 1)
            },
            settoken(state, data) {
                state.token = data
            },
            cleartoken(state) {
                state.token = null;
            },
            addingcitem(state, item) {
                let e = state.cart.filter((ci) => ci.id == item.id)
                if (e.length == 0) {
                    //item.quantity=item.quantity-1
                    state.cart.push({...item, cquantity: 1 })

                } else {
                    //item.quantity=item.quantity-1
                    let indexy = state.cart.findIndex((i) => item.id == i.id)
                    state.cart[indexy].cquantity += 1
                }
            },
            rmcitem(state, citem) {
                let indexy = state.cart.findIndex((i) => citem.id == i.id)
                state.cart[indexy].cquantity -= 1
                if (citem.cquantity == 0) {
                    let indexz = state.cart.findIndex((i) => citem.id == i.id)
                    state.cart.splice(indexz, 1)
                }
            },
            currentloginname(state, clname) {
                state.currentloginname = clname
            },
            seterrormsg(state,errormsg){
                state.errormsg=errormsg
            }
        },
        actions: {
        //     nuxtServerInit(vuexcontext, context) {
        //         if(!vuexcontext.state.currentloginname){
        //             return
        //         }

        //    return axios.get("https://stecomlikepos.firebaseio.com/"+vuexcontext.state.currentloginname+"/product.json")
        //          .then((res) => {
        //               const productarray = []
        //               for (const key in res.data) {
        //                   productarray.push({...res.data[key], id: key })
        //                  console.log(process.env.fbapikey)
        //               }
        //               vuexcontext.commit('setproduct', productarray)
        //            })
        //            .catch((e) => { context.error(e) })
        //     },
            addingcitem(vuexcontext, item) {
                if (item.stock <= 0) {
                    alert("out of stock!!!")
                } else {
                    vuexcontext.commit('addingcitem', {...item })
                }

            },
            rmcitem(vuexcontext, citem) {
                vuexcontext.commit('rmcitem', citem)

            },
            setproduct(vuexcontext, product) {
                vuexcontext.commit('setproduct', product)
            },
            setorder(vuexcontext, order) {
                vuexcontext.commit('setorder', order)
            },
            addproduct(vuexcontext, product) {
                return axios.post('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/product.json?auth=' + vuexcontext.state.token, product).then(
                    (result) => {
                        vuexcontext.commit('addproduct', {...product, id: result.data.name })
                        console.log(vuexcontext)
                        this.$router.push('/admin/')
                    }
                ).catch((err) => console.log(err))
            },
            addorder(vuexcontext, order) {
                return axios.post('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/order.json', order).then(
                    (result) => {
                        vuexcontext.commit('addorder', {...order, id: result.data.name })
                        this.$router.push('/voucher/' + result.data.name)
                        vuexcontext.dispatch('clearcart')
                    }
                ).catch((err) => console.log(err))
            },
            updateproduct(vuexcontext, product) {
                return axios.put('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/product/' + product.id + '.json', product) //?auth=' + vuexcontext.state.token, product)
                    .then(
                        (result) => { vuexcontext.commit('updateproduct', product) }
                    )
                    .catch((err) => console.log(err));

            },
            updateorder(vuexcontext, order) {
                return axios.put('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/order/' + order.id + '.json', order) //?auth=' + vuexcontext.state.token, product)
                    .then(
                        (result) => { vuexcontext.commit('updateorder', order) }
                    )
                    .catch((err) => console.log(err));

            },
            deleteproduct(vuexcontext, product) {
                return axios.delete('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/product/' + product.id + '.json?auth=' + vuexcontext.state.token)
                    .then(
                        (result) => { vuexcontext.commit('deleteproduct', product) }
                    )
            },
            deleteorder(vuexcontext, order) {
                return axios.delete('https://stecomlikepos.firebaseio.com/'+vuexcontext.state.currentloginname+'/order/' + order.id + '.json?auth=' + vuexcontext.state.token)
                    .then(
                        (result) => { vuexcontext.commit('deleteorder', order) }
                    )
            },
           async authmethod(vuexcontext, authdata) {
                let authurl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                if (!authdata.isLogin) {
                    authurl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                }
                return axios.post(authurl + process.env.fbapikey, {
                        email: authdata.email,
                        password: authdata.password,
                        returnSecureToken: true
                    }).then((result) => {
                        let c=result.data.email.split("@")[0]
                        vuexcontext.commit('currentloginname', c)
                        vuexcontext.commit('settoken', result.data.idToken)

                        if (process.client) {
                            localStorage.setItem('token', result.data.idToken)
                            localStorage.setItem('currentloginname', c)
                            localStorage.setItem('expiretime', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
                        }

                        Cookie.set('ctoken', result.data.idToken)
                        Cookie.set('currentloginname', c)
                        Cookie.set('cexpiretime', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
                        vuexcontext.commit('seterrormsg',null)
                        this.$router.push('/admin/')
                    })
                    .catch((err) => { 
                        //console.log( err.response.data.error.message)
                         vuexcontext.commit('seterrormsg',err.response.data.error.message)
                        console.log(vuexcontext.state.errormsg) 
                    })

            },
            reloadauth(vuexcontext, req) {
                let token;
                let timer;
                let currentloginname;
                if (req) {
                    console.log('runing server')
                    if (!req.headers.cookie) {
                        return;
                    }
                    let jscookie = req.headers.cookie.split(";") //it works here
                        .find((c) => { return c.trim().startsWith("ctoken=") });
                    console.log(jscookie)
                     currentloginname = req.headers.cookie.split(";") //it works here
                    .find((c) => { return c.trim().startsWith("currentloginname=") })
                    if (!jscookie) {
                        return
                    }
                    if (!currentloginname) {
                        return
                    }
                    token = jscookie.split('=')[1];
                    currentloginname=currentloginname.split('=')[1];
                    console.log(currentloginname)
                    timer = req.headers.cookie.split(";")
                        .find(c => c.trim().startsWith("cexpiretime="))
                        .split("=")[1];
                } else {
                    console.log("running local")
                    token = localStorage.getItem('token')
                    currentloginname = localStorage.getItem('currentloginname')
                    timer = localStorage.getItem('expiretime')

                }
                console.log(new Date().getTime(), +timer)
                if (new Date().getTime() > +timer || !token) {
                    console.log('no token or invalidtoken')
                    vuexcontext.dispatch('logout')
                    return;
                }

                console.log("running reloadauth")
                vuexcontext.commit('settoken', token)
                vuexcontext.commit('currentloginname', currentloginname)
                console.log(vuexcontext.state.currentloginname)

            },
            logout(vuexcontext) {
                vuexcontext.commit('cleartoken')
                if (process.client) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('expiretime')
                }
                Cookie.remove('ctoken')
                Cookie.remove('cexpiretime')
            },
            clearcart(vuexcontext) {

                for (let i in vuexcontext.state.cart) {
                    //console.log(vuexcontext.state.cart[i])
                    let indexy = vuexcontext.state.loadedproduct.findIndex((ai) => vuexcontext.state.cart[i].id == ai.id)
                    vuexcontext.state.loadedproduct[indexy].stock -= vuexcontext.state.cart[i].cquantity
                    console.log(vuexcontext.state.loadedproduct[indexy])
                    vuexcontext.dispatch('updateproduct', vuexcontext.state.loadedproduct[indexy])
                }
                vuexcontext.state.cart = []
            }




        },
        getters: {
            currentloginname(state) {
                return state.currentloginname
            },
            loadedproduct(state) {
                return state.loadedproduct
            },
            loadedorder(state) {
                return state.loadedorder
            },
            authenticated(state) {
                return state.token != null;
            },
            totalitem(state) {
                let totalitem = 0
                for (let i in state.cart) {

                    totalitem = totalitem + state.cart[i].cquantity
                }
                return totalitem

            },
            totalprice(state) {
                let totalprice = 0
                for (let i in state.cart) {

                    totalprice = totalprice + parseInt(state.cart[i].productprice) * state.cart[i].cquantity
                }
                return totalprice
            },
            cart(state) {
                return state.cart
            },
            errormsg(state){
                return state.errormsg
            },
            title(state){
                return state.title
            },
            checkout(state, getters) {

            },
            authenticated(state) {
                return state.token != null;
            }
        }




    })
}
export default createstore