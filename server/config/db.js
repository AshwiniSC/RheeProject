import  mongoose from 'mongoose';

const options = {
 	db: { native_parser: true },
 	server: { poolSize: 5 },
 	replset: { rs_name: 'myReplicaSetName' },
 	user: '',
 	pass: '',
 	auth: {
 	  authdb: ''
 	}
}

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://mongoIp:27017/dbName",options);
mongoose.connect("mongodb://localhost:27017/Rhee");
