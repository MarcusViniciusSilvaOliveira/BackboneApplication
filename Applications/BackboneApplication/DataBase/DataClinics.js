var DataClinics = Backbone.Collection.extend({
    model : Clinic,
    url: "https://my-json-server.typicode.com/MarcusViniciusSilvaOliveira/JsonServer/ClinicData",
    GetByName: function (name) {
        filtered = this.filter(function (dataClinic) {
            return dataClinic.get("Name").toLowerCase().indexOf(name.toLowerCase()) != -1;
        });
        return new DataClinics(filtered);
    },
    GetByPhone: function (phoneN) {
        filtered = this.filter(function (dataClinic) {
            return dataClinic.get("PhoneNumber").indexOf(phoneN.toLowerCase()) != -1;
        });
        return new DataClinics(filtered);
    },
   });