var router = null;
var Router = Backbone.Router.extend({
    routes: {
        "":"listView",
        "detail/:id":"detailView"
    },
    listView: function(){
        var listView = new ListView({ el: "#content"});
        listView.render();
    },
    detailView: function(id){
        var detailView = new DetailView({ el: "#content", Id : id});
        detailView.render();
    }
})

$(document).ready(function (){

     router = new Router();
     Backbone.history.start();

});