<template>
 <div class="bgImg">
     <img src="../../assets/images/welcome.jpg" alt="">
 </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
    .bgImg{
        position: relative;

        img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 180px auto;
        }
    }
</style>
