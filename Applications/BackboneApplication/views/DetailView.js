var DetailView = Backbone.View.extend({
  
  events: {
    "click #Back_Bnt": "BackToList"
  },
  
  initialize: function (options) {
             
    _.bindAll(this, 'render');
    var _this = this;
    this.render = _.wrap(this.render, function (render) {
      render(options.Id);
      return _this;
    });
  },
      
  render: function (Id) {

    var clinics = new DataClinics([] , {Url : "https://my-json-server.typicode.com/MarcusViniciusSilvaOliveira/JsonServer/ClinicData"});
    var _el = this.$el;

    clinics.fetch({
      success:function (data){
        var clinic = data.get(Id);
        var template = _.template($('#details').html());
        
        _el.append(template(clinic.toJSON()));
        _el.append("<button id='Back_Bnt'>Back to main page</button>");
        return this;
      }
    });
  },
  BackToList: function () {

    this.remove();
    this.unbind();
    $('body').append("<div id='content' ></div>");

    window.history.back();
  }

})