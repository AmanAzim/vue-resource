import Vue from 'vue'
import App from './App.vue'
import VueResource from 'Vue-resource';

Vue.use(VueResource);

Vue.http.options.root='https://vuejs-http-4e9e1.firebaseio.com/AmanData.json';

Vue.http.interceptors.push( (request, next)=>{ console.log(request); } );

new Vue({
  el: '#app',
  render: h => h(App)
})
