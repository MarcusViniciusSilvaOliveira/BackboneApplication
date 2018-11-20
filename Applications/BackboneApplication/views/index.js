var teste = Backbone.Model.extend({
    initialize : function (){
        alert("teste");
    }
})

$(document).ready(function (){
      var t = new teste();
})