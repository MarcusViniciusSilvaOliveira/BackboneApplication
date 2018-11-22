var DataClinics = Backbone.Collection.extend({
    model : Clinic,
    initialize: function(models,options){
        this.url = options.Url;
    },
    GetByName: function (name) {
        filtered = this.filter(function (dataClinic) {
            return dataClinic.get("Name").toLowerCase().indexOf(name.toLowerCase()) != -1;
        });
        return new DataClinics(filtered,{ Url : this.url});
    }
});