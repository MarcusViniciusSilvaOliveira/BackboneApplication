var DataClinics = Backbone.Collection.extend({
    model: DataClinics,
    url: "https://my-json-server.typicode.com/danilomarley/MyJsonServer/Clinics",
    //Creating filter by name
    byName: function (name) {
           filtered = this.filter(function (clinic) {
               return clinic.get("Name").toLowerCase().indexOf(name.toLowerCase()) != -1;
           });
           return new DataClinics(filtered);
       }
   });