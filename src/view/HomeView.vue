<template>
  <div class="cube-container">
    <div class="cube initial-position">
      <img class="cube-face-image image-1" src="../style/images/p1300.jpg" alt="">
      <img class="cube-face-image image-2" src="../style/images/p2300.jpg" alt="">
      <img class="cube-face-image image-3" src="../style/images/p3300.jpg" alt="">
      <img class="cube-face-image image-4" src="../style/images/p4300.jpg" alt="">
      <img class="cube-face-image image-5" src="../style/images/p5300.jpg" alt="">
      <img class="cube-face-image image-6" src="../style/images/p6300.jpg" alt="">
    </div>
  </div>
  <div class="image-buttons">

    <input type="image" class="show-image-1" src="../style/images/p1100.jpg" alt=""/>
    <input type="image" class="show-image-2" src="../style/images/p2100.jpg" alt=""/>
    <input type="image" class="show-image-3" src="../style/images/p3100.jpg" alt=""/>
    <input type="image" class="show-image-4" src="../style/images/p4100.jpg" alt=""/>
    <input type="image" class="show-image-5" src="../style/images/p5100.jpg" alt=""/>
    <input type="image" class="show-image-6" src="../style/images/p6100.jpg" alt=""/>

  </div>
</template>
<script>
export default {
  name: "HomeView"
};
//DOM load event
window.addEventListener("DOMContentLoaded", function () {

  var cube = document.querySelector(".cube"),
      imageButtons = document.querySelector(".image-buttons");
  var cubeImageClass = cube.classList[1];

  //Add click event listener to image buttons container
  imageButtons.addEventListener("click", function (e) {

    //Get node type and class value of clicked element
    var targetNode = e.target.nodeName,
        targetClass = e.target.className;

    //Check if image input has been clicked and isn't the currently shown image
    if (targetNode === "INPUT" && targetClass !== cubeImageClass) {

      console.log("Show Image: " + targetClass.charAt(11));

      //Replace previous cube image class with new class
      cube.classList.replace(cubeImageClass, targetClass);

      //Update cube image class variable with new class
      cubeImageClass = targetClass;
    }
  });
});
</script>


<style>
/* 这里定义样式，包括魔方的外观和格子的布局 */
@import url('../style/css/style.css');
@import url('../style/css/reset.min.css');
</style>
