import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
     serverMiddleware: [
        // Will register redirect-ssl npm package
        //'redirect-ssl',
    
        // Will register file from project server-middleware directory to handle /server-middleware/* requires
        { path: '/server-middleware', handler: '~/server-middleware/index.js' },
        { path: '/test-api', handler: '~/server-middleware/test-api.js' },
        { path: '/draft', handler: '~/server-middleware/draft.js' },
        { path: '/hud', handler: '~/server-middleware/hud.js' },
        { path: '/itembuild', handler: '~/server-middleware/itembuild.js' },
        { path: '/mvp', handler: '~/server-middleware/mvp.js' },
        { path: '/player_list', handler: '~/server-middleware/player_list.js' },
    
        // We can create custom instances too
        //{ path: '/static2', handler: serveStatic(__dirname + '/static2') }
      ],
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
        {src:'~/plugins/vuetify.js'}
         
    ],
    /*
     ** Nuxt.js dev-modules
     */
    /*
     ** Nuxt.js modules
     */
    modules: [

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
}