<template>
<div :class="componentWrapper">

  <div v-if="within" class="steps-form">
    <div class="steps-row">
      <div class="steps-step" v-for="(step, index) in steps" :key="index">
        <a type="button" class="btn btn-circle btn-default"
              @click.prevent="changeActiveStep(index+1)"
              :class="{'btn-indigo': (activeStep-1==index)}">{{index+1}}</a>
        <p>{{step.name}}</p>
      </div>
    </div>
  </div>

  <div v-else-if="(simpleH || simpleV)" class="row" :class="{'mt-5': simpleV}">
    <div class="col-md-12">
      <ul :class="simpleClass">
        <slot name="simple">
        </slot>
      </ul>
    </div>
  </div>

  <div v-else :class="optionalColumnWrapper">
    <div :class="formClass">
      <div :class="rowClass">
        <div :class="stepClass" v-for="(step, index) in steps" :key="index">
          <tooltip trigger="hover" :options="{placement: 'top'}" :ref="'stepContent'+index">
            <div class="tooltip">
              {{step.name}}
            </div>
              <btn :class="stepButtonClass"
                    slot="reference"
                    @click.native="changeActiveStep(index+1)"
                    waves
              >
                <i :class="'fa fa-'+step.icon" aria-hidden="true"></i>
              </btn>
          </tooltip>
        </div>
      </div>
    </div>
  </div>

  <div ref="contentRef" :class="optionalContentWrapper">
    <form role="form" action="" method="post">
      <slot name="content" slot-scope=""></slot>
      <btn v-if="buttons && activeStep!==numOfSteps" rounded class="float-right" type="button" :color="navBtnColor" @click.native="buttonNav('next')">{{nextBtn}}</btn>
      <btn v-if="buttons && activeStep!==1" rounded class="float-left" type="button" :color="navBtnColor" @click.native="buttonNav('prev')">{{prevBtn}}</btn>
      <btn v-if="buttons && activeStep==numOfSteps" rounded class="float-right" type="button" :color="submitBtnColor" @click.native="submit">{{submitBtn}}</btn>
    </form>
  </div>
</div>

</template>

<script>
import Tooltip from '../Tooltip';
import Btn from '../Button';
import classNames from 'classnames';

const Stepper = {
  components: {
    Tooltip,
    Btn,
  },
  props: {
    buttons: {
      type: Boolean,
      default: false
    },
    submitFunction: {
      type: Function
    },
    vertical: {
      type: Boolean,
      defaut:false
    },
    within: {
      type: Boolean,
      default: false
    },
    simpleH: {
      type: Boolean,
      default: false
    },
    simpleV: {
      type: Boolean,
      default: false
    },
    nextBtn: {
      type: String,
      default: "next"
    },
    prevBtn: {
      type: String,
      default: "previous"
    },
    submitBtn: {
      type: String,
      default: "submit"
    }
  },
  data() {
    return {
      activeStep: 1,
      numOfSteps: 0,
      steps: []
    };
  },
  created() {
    if (this.$slots.content) {
      const allChildren = this.$slots.content;
      allChildren.forEach(vnode => {
        if (vnode.componentOptions) {
          const icon = vnode.componentOptions.propsData.icon;
          const name = vnode.componentOptions.propsData.name;
          const activeStep = this.activeStep;
          this.numOfSteps++;
          const thisStepNumber = this.numOfSteps;
          vnode.componentOptions.propsData = {...vnode.componentOptions.propsData, number: this.numOfSteps};
          let step = { icon, name, thisStepNumber, activeStep };
          let listToUpdate = this.steps;
          listToUpdate.push(step);
          this.steps = listToUpdate;
        }
      });
    }
  },
  methods: {
    changeActiveStep(i) {
      this.activeStep = i;
    },
    buttonNav(string) {
      if (string == "next") {
        this.activeStep++;
      }
      else {
        this.activeStep--;
      }
      if (this.activeStep < 1 || this.activeStep > this.numOfSteps) {
        this.activeStep = 0;
      }
    },
    submit() {
      if (this.submitFunction) {
        this.submitFunction();
      } else {console.log("Form Submitted!");}
    },
    stepClick(index) {
      this.changeActiveStep(index+1);
    }
  },
  computed: {
    componentWrapper() {
      return classNames(
        "pb-5",
        this.vertical ? "row pt-5 d-flex justify-content-center" : false
      );
    },
    optionalColumnWrapper() {
      return classNames(
        this.vertical ? "col-md-2 pl-5 pl-md-0 pb-5" : false
      );
    },
    formClass() {
      return classNames(
        this.vertical? "steps-form-3" : "steps-form-2"
      );
    },
    rowClass() {
      return classNames(
        this.vertical ? "steps-row-3 setup-panel-3 d-flex justify-content-between" : "steps-row-2 setup-panel-2 d-flex justify-content-between"
      );
    },
    stepClass() {
      return classNames(
        this.vertical ? "steps-step-3" : "steps-step-2"
      );
    },
    optionalContentWrapper(){
      return classNames(
        this.vertical && "col-md-7"
      );
    },
    stepButtonClass() {
      return classNames(
        "btn",
        this.vertical? "btn-info btn-circle-3 waves-effect":
          "btn-amber btn-circle-2 waves-effect ml-0"
      );
    },
    navBtnColor() {
      return this.within ? "indigo":"mdb-color";
    },
    submitBtnColor(){
      return this.within ? "default" : "success";
    },
    simpleClass() {
      return this.simpleV ? "stepper stepper-vertical" : "stepper stepper-horizontal";
    }
  }
};

export default Stepper;
export { Stepper as mdbStepper};
</script>

<style>
.steps-form {
    display: table;
    width: 100%;
    position: relative; }
.steps-form .steps-row {
    display: table-row; }
.steps-form .steps-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1.1px;
    background-color: #ccc; }
.steps-form .steps-row .steps-step {
    display: table-cell;
    text-align: center;
    position: relative; }
.steps-form .steps-row .steps-step p {
    margin-top: 0.5rem; }
.steps-form .steps-row .steps-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important; }
.steps-form .steps-row .steps-step .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
    margin-top: 0; }
.steps-form-2 {
    display: table;
    width: 100%;
    position: relative; }
.steps-form-2 .steps-row-2 {
    display: table-row; }
.steps-form-2 .steps-row-2:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 99%;
    height: 2px;
    background-color: #7283a7; }
.steps-form-2 .steps-row-2 .steps-step-2 {
    display: table-cell;
    text-align: center;
    position: relative; }
.steps-form-2 .steps-row-2 .steps-step-2 p {
    margin-top: 0.5rem; }
.steps-form-2 .steps-row-2 .steps-step-2 button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important; }
.steps-form-2 .steps-row-2 .steps-step-2 .btn-circle-2 {
    width: 70px;
    height: 70px;
    border: 2px solid #59698D;
    background-color: white !important;
    color: #59698D !important;
    border-radius: 50%;
    padding: 22px 18px 15px 18px;
    margin-top: -22px; }
.steps-form-2 .steps-row-2 .steps-step-2 .btn-circle-2:hover {
    border: 2px solid #4285F4;
    color: #4285F4 !important;
    background-color: white !important; }
.steps-form-2 .steps-row-2 .steps-step-2 .btn-circle-2 .fa {
    font-size: 1.7rem; }

.steps-form-3 {
    width: 2px;
    height: 470px;
    position: relative; }
.steps-form-3 .steps-row-3 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column; }
.steps-form-3 .steps-row-3:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: "";
    width: 2px;
    height: 100%;
    background-color: #7283a7; }
.steps-form-3 .steps-row-3 .steps-step-3 {
    height: 150px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    position: relative; }
.steps-form-3 .steps-row-3 .steps-step-3.no-height {
    height: 50px; }
.steps-form-3 .steps-row-3 .steps-step-3 p {
margin-top: 0.5rem; }
.steps-form-3 .steps-row-3 .steps-step-3 button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important; }
.steps-form-3 .steps-row-3 .steps-step-3 .btn-circle-3 {
    width: 60px;
    height: 60px;
    border: 2px solid #59698D;
    background-color: white !important;
    color: #59698D !important;
    border-radius: 50%;
    padding: 18px 18px 15px 15px;
    margin-top: -22px; }
.steps-form-3 .steps-row-3 .steps-step-3 .btn-circle-3:hover {
    border: 2px solid #4285F4;
    color: #4285F4 !important;
    background-color: white !important; }
.steps-form-3 .steps-row-3 .steps-step-3 .btn-circle-3 .fa {
    font-size: 1.7rem; }
</style>
