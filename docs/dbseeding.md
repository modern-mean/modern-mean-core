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
The email is user@localhost.com and the password is after the colon 2kDzzAYesTqRKP.  The password is randomly generated
