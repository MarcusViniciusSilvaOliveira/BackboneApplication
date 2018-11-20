var DetailView = Backbone.View.extend({
    //View events
  events: {
    "click #Back_Bnt": "BackToList"
  },
  //trigged when new instance of this view is called
  initialize: function (options) {
    //Configuration of "afterRender" event to execute after render event finished          
    _.bindAll(this, 'render', 'afterRender');
    var _this = this;
    this.render = _.wrap(this.render, function (render) {
      render();
      _this.afterRender();
      return _this;
    });
  },
  //Render to generate view     
  render: function () {
    var template = _.template($('#details').html());
    this.$el.append(template(this.model.toJSON()));
    this.$el.append("<button id='Back_Bnt'>Back</button>");
    return this;
  },
  //afterRender to create new objects
  afterRender: function () {
    $('#back').puibutton({
      icon: 'fa-arrow-left'
    });
    $('#content').puipanel({
      title: "Clinic informations"
    });
  },
  //Event of button to return to index
  BackToList: function () {
      
    $('#content').empty();
    //Instance of new index View
    var listView = new ListView({ el: '#content' });
    listView.render();
  }

})