import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
          
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Material+Icons" },

        ],
        script: [
           
            { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZj09EooVd3EVzULdsI2-E1VS2R2OXKz4&libraries=places' }
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@assets/styles/index.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/vue_qrcode_reader', mode: 'client' },
       
        { src: '~/plugins/vue-clipboard2', mode: 'client' },
      
        { src: '~/plugins/fb-chat.js', ssr: false },
        {src:'~/plugins/components.js'},
        {src:'~/plugins/vuetify.js'}
         
    ],
    /*
     ** Nuxt.js dev-modules
     */
    /*
     ** Nuxt.js modules
     */
    modules: [
        'vue-scrollto/nuxt',
    ],
    
buildModules: [
   // Simple usage
  '@nuxtjs/vuetify',
  ],
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    env: {
        fbapikey: "AIzaSyAr66KOA3tpzPjVAUDd8hlwjF8wYgzI26Q",
    }
}