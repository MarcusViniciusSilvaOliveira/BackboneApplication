var ListView = null;

$(document).ready(function (){

     var clinics = new DataClinics();
     //Binding event on Collection changed
     
     clinics.bind("change add remove", function () {
         datatable.updateDataSource(clinics.toJSON());
     });
     //Data table instance
     var datatable = null;
    
     ListView = Backbone.View.extend({
        events:{
            "click #tableClinics":"selectRow",
            "input #searchName":"searchByName",
        },
        initialize: function (){
            _.bindAll(this, 'render', 'afterRender');

            this.render = _.wrap(this.render, function (render) {
                render();
                this.afterRender();
                return this;
            });
        },
        render: function (){
            this.$el.append("<label>Clinic name</label></br>");
            this.$el.append("<input type='text' style='font-family: 'FontAwesome'' placeholder='Search' id='searchName' />");
            this.$el.append("<div style='padding-top:5px; padding-bottom:3px' id='tableClinics'></div>");
            this.$el.append("<p style='font-size: 13;''>click to show more informations</p>");
            return this;
        },
        afterRender: function (){
            
            $('#searchClinic').puiinputtext();
             //Data table Colums
             var dataTableColumns = [
                { field: 'Name', headerText: 'Name' },
                { field: 'Address', headerText: 'Address' },
                { field: 'Phone', headerText: 'Phone' },
                { field: 'City', headerText: 'City' },
            ];
            // New instance of data table
            datatable = new sortpuidatatable('#tableClinics', dataTableColumns);

            clinics.fetch({
                success: function () {
                },
                error: function (ex) {
                }
            });
        },
        searchByName: function (e){
            e.stopPropagation();

            var value = $('#searchName').val();
            if (value === "")
                datatable.updateDataSource(clinics.toJSON());
            else {
                var filteredData = clinics.byName(value);
                datatable.updateDataSource(filteredData.toJSON());
            }
        },
        selectRow: function(e){
            var data = datatable.getSelection();
            if(data != null){
                
            $('#content').empty();

            var selectedClinic = new Clinic(data);

            var detailView = new DetailView({ el: "#content" , model : selectedClinic})
            detailView.render();
            }
        }
    });

    var listView = new ListView({ el: "#content"});
    listView.render();
})