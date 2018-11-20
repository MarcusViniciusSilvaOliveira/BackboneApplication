var DataClinics = Backbone.Collection.extend({
    model : Clinic,
    url: "https://my-json-server.typicode.com/danilomarley/MyJsonServer/Clinics",
    //Creating filter by name
    byName: function (name) 
       {
           filtered = this.filter(function (dataClinic) {
               return dataClinic.get("Name").toLowerCase().indexOf(name.toLowerCase()) != -1;
           });
           return new DataClinics(filtered);
       }
   });