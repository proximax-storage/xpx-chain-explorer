<template>
  <div id="app">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/menu/Menu'
export default {
  components: {
    Menu
  }  
}
</script>


<style lang="scss">

  .card {
    padding: 10px;
    margin: 20px;
  }

  .background-app {
    background: #eee;
  }

  .background-explorer {
    background-image: -webkit-linear-gradient(140deg, rgb(32, 128, 115) 0%, rgb(32, 181, 172) 34%, #009688 100%);
    background-image: -moz-linear-gradient(140deg, rgb(32, 128, 115) 0%, rgb(32, 181, 172) 34%, #009688 100%);
    background-image: -o-linear-gradient(140deg, rgb(32, 128, 115) 0%, rgb(32, 181, 172) 34%, #009688 100%);
    background-image: -ms-linear-gradient(140deg, rgb(32, 128, 115) 0%, rgb(32, 181, 172) 34%, #009688 100%);
    background-image: linear-gradient(140deg, rgb(32, 128, 115) 0%, rgb(32, 181, 172) 34%, #009688 100%);
    background-attachment: fixed;
    background-position: center center;
  }

  .mdb-form input[type=text], .mdb-form input[type=password], .mdb-form input[type=email],
  .mdb-form input[type=url], .mdb-form input[type=time], .mdb-form input[type=date],
  .mdb-form input[type=datetime-local], .mdb-form input[type=tel], .mdb-form input[type=number],
  .mdb-form input[type=search-md], .mdb-form input[type=search] {
    color: white !important;
  }

  .mdb-form label {
    color: white !important;
  }

  .mdb-form input[type=text]:focus:not([readonly]), .md-form input[type=password]:focus:not([readonly]),
  .mdb-form input[type=email]:focus:not([readonly]), .md-form input[type=url]:focus:not([readonly]),
  .mdb-form input[type=time]:focus:not([readonly]), .md-form input[type=date]:focus:not([readonly]),
  .mdb-form input[type=datetime-local]:focus:not([readonly]), .md-form input[type=tel]:focus:not([readonly]),
  .mdb-form input[type=number]:focus:not([readonly]), .md-form input[type=search-md]:focus:not([readonly]),
  .mdb-form input[type=search]:focus:not([readonly]), .md-form textarea.md-textarea:focus:not([readonly]){
    box-shadow: 0 1px 0 0 #fff !important;
    border-bottom: 1px solid #fff !important;
  }

  .text-white {
    color: white !important;
  }

</style>