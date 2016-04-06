#Database seeding
Most modules will be developed to seed testing information into the database.  To enable seeding set the MONGO_SEED environment variable to true.
```bash
MONGO_SEED=true gulp
```

##Users module
Seeding in the users module will create a user account and an admin account.  You can view the login information in the terminal.
```sh
Users::Model::Seed::User:: user@localhost.com:2kDzzAYesTqRKP
Users::Model::Seed::Admin:: admin@localhost.com:Bq1z3qc1uM
```
The email is user@localhost.com and the password is after the colon 2kDzzAYesTqRKP.  The password is randomly generated.  When the server is restarted due to changes the seeding will happen again.  This will change the users password but not the ID in the mongo database.  So you will need the new password to authenticate but if a user is already authenticated they will not have to re authenticate.
