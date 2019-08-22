<template>
  <div class="container" @click.stop="toggle">
    <span class="switch" :class="{'switch-on' : checked}"  ></span>
  </div>
</template>

<script>
  export default {
    props: {
      checked: {
        type: Boolean,
        default: true
      },
      index: {
        type:Number,
        default:0
      },
      handle: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
      }
    },
    methods: {
      toggle() {
        // 是否可点击
        if(this.handle === true){
          this.checked = !this.checked;
          this.$emit('changeSwitch',this.checked,this.index)
        }

      }
    }
  }
</script>

<style scoped>
  .container{
    position:relative;
    font-weight: bold;
    cursor:pointer;
    width: 80px;
    height: 30px;
  }
  .switch {
    display: block;
    position: relative;
    width: 80px;
    height: 30px;
    outline: 0;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    background-color: #E6E6E6;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .switch:after {
    content: " ";
    position: absolute;
    top: -10px;
    left: 0;
    width:50px;
    height: 50px;
    border-radius: 25px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .switch-on {
    border-color: #F2DC37;
    background-color: #F2DC37;
  }
  .switch-on:before {
    border-color: #F2DC37;
    background-color: #F2DC37;
  }
  .switch-on:after {
    transform: translateX(30px);
    content: '';
  }
</style>
