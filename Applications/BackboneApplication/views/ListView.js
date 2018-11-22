var clinics = new DataClinics([],{Url : "https://my-json-server.typicode.com/MarcusViniciusSilvaOliveira/JsonServer/ClinicData"});
var datatable = null;

var ListView = Backbone.View.extend({
    events:{
        "click #tableClinics td":"selectRow",
        "click #searchButton":"searchByFilter",
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
        this.$el.append(
            "<div>"
            +"<label>Name: </label> <input type='text' class='form-control'  placeholder='...' id='searchName' />&nbsp&nbsp&nbsp&nbsp"
            +"<button id='searchButton'>Search</button>"
            +"</div></br>");
        this.$el.append("<h2>Clinics</h2>");
        this.$el.append("<table id='tableClinics'></table>");
        this.$el.append("<p style='font-size: 15px;'>click to show details</p>");
        return this;
    },
    afterRender: function (){
        clinics.fetch({
            success : function(){ searchClinics(clinics); }
        })
    },
    searchByFilter: function (e){
        e.preventDefault();
        var val = $('#searchName').val();
        
        if (val != "") 
        {
            var clinicsByName = clinics.GetByName(val);  
            searchClinics(clinicsByName); 
        }else{
            searchClinics(clinics);
        }
    },
    selectRow: function(e){
        var _table = e.target.parentNode;
        var _Id = _table.firstChild.innerText;
       
        this.remove();
        this.unbind();
        $('body').append("<div id='content' ></div>");

        window.location = location.href + "#detail/" + _Id;
    }
});

var searchClinics = function (dt)
{
    $('#tableClinics').empty();
    $('#tableClinics').append("<tr style='background-color:#dedede'><th>Name</th><th>Address</th><th>Phone</th></tr>");
    _.each(dt.models, function (key, value){
        var v = key.attributes;
        $('#tableClinics').append("<tr><td style='display:none'>" + v.Id + "</td><td>" + v.Name + "</td><td>" + v.Address + "</td><td>" + v.PhoneNumber + "</td></tr>");
    });
}