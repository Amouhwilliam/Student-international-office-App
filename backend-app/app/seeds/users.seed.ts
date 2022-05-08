
var seeder = require('mongoose-seed');
// Connect to MongoDB via Mongoose
seeder.connect("mongodb://localhost:27017/mit_app_db", function() {
 
  // Load Mongoose models
  seeder.loadModels([
    '../models/user.model'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['user'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});

var data = [
    {
        'model': 'user',
        'documents': [
            {
                'first_name': 'John ',
                'last_name': 'DOE',
                'email': 'john.doe@gmail.com',
                'password':123456,
                'address':'Deggendorf Germany',
                'type': 'staff',
                'birthdate': '01-01-1992',
                'profile_picture': null
            }
        ]
    }
];