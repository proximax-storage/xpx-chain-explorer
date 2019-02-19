<template>
  <div id="app">
    <Menu/>
    <search-filter/>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/menu/Menu'
import SearchFilter from '@/components/searchFilter/SearchFilter'

export default {
  components: {
    Menu,
    SearchFilter,
  }  
}
</script>


<style lang="scss">
  html {
    background: #eee
  }

  #app {
    background: #eee
  }

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

  .text-center {
    text-align: center;
  }

  .text-white {
    color: white !important;
  }

  .text-green {
    color: green !important;
  }

  .text-red {
    color: red !important;
  }

  .page-link {
    border: 0px !important;
    color: grey
  }

  .page-link:hover {
    border-radius: 50% !important;
    color: #18ada3 !important;
  }

  a:hover {
    color: #18ada3 !important;
  }

  .info {
    padding: 10px;
  }

  .bold {
    font-weight: bold;
  }

  .green-back {
    background: #00968833;
  }

</style>
