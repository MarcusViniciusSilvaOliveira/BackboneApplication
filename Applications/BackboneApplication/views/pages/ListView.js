var clinics = new DataClinics();
var datatable = null;

var ListView = Backbone.View.extend({
    events:{
        "click #tableClinics":"selectRow",
        "input #searchName":"searchByName",
        "input #searchPhoneNumber":"searchByPhone",
    },
    initialize: function (){
        clinics.bind("change add remove", function () {
            datatable.updateDataSource(clinics.toJSON());
        });

        _.bindAll(this, 'render', 'afterRender');

        this.render = _.wrap(this.render, function (render) {
            render();
            this.afterRender();
            return this;
        });
    },
    render: function (){
        this.$el.append(
            "<div>"
            +"<label>Name: </label> <input type='text' class='form-control'  placeholder='...' id='searchName' />&nbsp&nbsp"
            +"<label>PhoneNumber: </label> <input type='text' class='form-control'  placeholder='...' id='searchPhoneNumber' />"
            +"</div></br>");
        this.$el.append("<div style='padding-top:5px; padding-bottom:3px' id='tableClinics'></div>");
        this.$el.append("<p style='font-size: 15px;'>click to show details</p>");
        return this;
    },
    afterRender: function (){
        $('#searchClinic').puiinputtext();
        
         var dataTableColumns = [
            { field: 'Name', headerText: 'Name' },
            { field: 'Address', headerText: 'Address' },
            { field: 'PhoneNumber', headerText: 'Phone' },
        ];
        
        datatable = new sortpuidatatable('#tableClinics', dataTableColumns);

        clinics.fetch();
    },
    searchByName: function (e){
        e.stopPropagation();

        var val = $('#searchName').val();
        if (val === "")
            datatable.updateDataSource(clinics.toJSON());
        else {
            var clinicsByName = clinics.GetByName(val);
            datatable.updateDataSource(clinicsByName.toJSON());
        }
    },
    searchByPhone: function (e){
        e.stopPropagation();

        var val = $('#searchPhoneNumber').val();
        if (val === "")
            datatable.updateDataSource(clinics.toJSON());
        else {
            var clinicsByName = clinics.GetByPhone(val);
            datatable.updateDataSource(clinicsByName.toJSON());
        }
    },
    selectRow: function(e){
        var data = datatable.getSelection();
        if(data != null){
            
        this.remove();
        this.unbind();
        $('body').append("<div id='content' ></div>");

        var selectedClinic = new Clinic(data);

        var detailView = new DetailView({ el: "#content" , model : selectedClinic})
        detailView.render();
        }
    }
});