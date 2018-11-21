var DetailView = Backbone.View.extend({
  
  events: {
    "click #Back_Bnt": "BackToList"
  },
  
  initialize: function (options) {
             
    _.bindAll(this, 'render', 'afterRender');
    var _this = this;
    this.render = _.wrap(this.render, function (render) {
      render();
      _this.afterRender();
      return _this;
    });
  },
      
  render: function () {
    var template = _.template($('#details').html());
    this.$el.append(template(this.model.toJSON()));
    this.$el.append("<button id='Back_Bnt'>Back to main page</button>");
    return this;
  },
  
  afterRender: function () {
    $('#back').puibutton({
      icon: 'fa-arrow-left'
    });
    $('#content').puipanel({
      title: "Informations"
    });
  },
  
  BackToList: function () {

    this.remove();
    this.unbind();
    $('body').append("<div id='content' ></div>");

    var listView = new ListView({ el: '#content' });
    listView.render();
  }

})