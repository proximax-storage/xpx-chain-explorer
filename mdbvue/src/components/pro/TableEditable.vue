<template>
  <div class="dataTables_wrapper" :style="wrapperStyle">
    <span @click="addHandler" class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"><fa icon="plus" class="fa-2x"/></a></span>
    <!-- Main table -->
    <tbl v-if="!scrollY" v-bind="tableProps" sm datatable>
      <tbl-head :color="headerColor" :textWhite="headerWhite">
        <tr>
          <th
            v-for="column in columns"
            :key="column.field"
          >
            {{column.label}}
          </th>
          <th>Sort</th>
          <th>Remove</th>
        </tr>
      </tbl-head>
      <tbl-body>
        <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
          <td contenteditable="true" @blur="(event) => update(rowIndex, fieldIndex, event)" v-for="(value, fieldIndex) in row" :key="`field-${fieldIndex}`">
            {{value}}
          </td>
          <td>
            <a href="#!" @click="rowUpHandler(rowIndex)" class="indigo-text table-up"><fa icon="long-arrow-up"/></a>
            <a href="#!" @click="rowDownHandler(rowIndex)" class="indigo-text table-down"><fa icon="long-arrow-down"/></a>
          </td>
          <td>
            <mdb-btn @click.native.prevent="removeHandler(rowIndex)" color="danger" class="table-remove" size="sm" rounded>Remove</mdb-btn>
          </td>
        </tr>
      </tbl-body>
    </tbl>
    <!-- Main table -->

  </div>
</template>

<script>
// import classNames from 'classnames';
import Tbl from './../Table';
import TblHead from './../TableHead';
import TblBody from './../TableBody';
import Fa from './../Fa';
import mdbBtn from './../Button.vue';

const TableEditable = {
  name: 'TableEditable',
  props: {
    columns: {
      type: Array
    },
    rows: {
      type: Array
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    headerColor: {
      type: String
    },
    headerWhite: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    materialInputs: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String
    },
    order: {
      type: Array
    },
    pagination: {
      type: Boolean,
      default: true
    },
    responsive: {
      type: Boolean,
      default: false
    },
    responsiveSm: {
      type: Boolean,
      default: false
    },
    responsiveMd: {
      type: Boolean,
      default: false
    },
    responsiveLg: {
      type: Boolean,
      default: false
    },
    responsiveXl: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      defautl: false
    },
    searching: {
      type: Boolean,
      default: true
    },
    sorting: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutableRows: this.rows,
      tableProps: {
        autoWidth: this.autoWidth,
        bordered: this.bordered,
        borderless: this.borderless,
        dark: this.dark,
        fixed: this.fixed,
        hover: this.hover,
        responsive: this.responsive,
        responsiveSm: this.repsonsiveSm,
        responsiveMd: this.repsonsiveMd,
        responsiveLg: this.responsiveLg,
        responsiveXl: this.responsiveXl,
        striped: this.striped,
        dtScrollY: this.scrollY
      },
      wrapperStyle: {
        maxWidth: this.maxWidth ? this.maxWidth : '100%',
        margin: '0 auto'
      }
    };
  },
  components: {
    Tbl,
    TblHead,
    TblBody,
    Fa,
    mdbBtn
  },
  methods: {
    removeHandler(row) {
      let newArray = this.mutableRows.splice(row, 1);
      this.mutableRows = newArray;
    },
    addHandler() {
      let newRow = {};
      if (this.rows.length === 0){
        for (let i = 0; i < this.columns.length; i++){
          newRow[this.columns[i].field] = "";
        }
      } else {
        newRow = this.rows[this.rows.length - 1];
      }
      this.mutableRows.push(newRow);
    },
    rowDownHandler(row) {
      if (row < this.mutableRows.length - 1){
        const tmp = this.mutableRows[row];
        const nextTmp = this.mutableRows[row + 1];
        this.mutableRows[row] = nextTmp;
        this.mutableRows[row + 1] = tmp;
        this.mutableRows.splice(row, 1, nextTmp);
        this.mutableRows.splice((row + 1), 1, tmp);
      }
    },
    rowUpHandler(row){
      if (row !== 0){
        const tmp = this.mutableRows[row];
        const previousTmp = this.mutableRows[row - 1];
        this.mutableRows[row] = previousTmp;
        this.mutableRows[row - 1] = tmp;
        this.mutableRows.splice(row, 1, previousTmp);
        this.mutableRows.splice((row - 1), 1, tmp);
      }
    },
    update(row, field, event){
      let newRow = {...this.mutableRows[row], [field]: event.target.innerText};
      this.mutableRows.splice(row, 1, newRow);
    }
  },
  watch: {
    rows(){
      this.mutableRows = this.rows;
    }
  }
};

export default TableEditable;
export { TableEditable as mdbTableEditable };
</script>

<style scoped>
.dataTables-scrollBody {
  display: block;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
