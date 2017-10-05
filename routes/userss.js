const uuidv1 = require('uuid/v1');

var express = require('express');
var router = express.Router();
 var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res) {
    var collection = db.get('users');
    collection.find({}, function(err, users){
        if (err) throw err;
      	res.json(users);
    });
});
router.get('/xd', function(req, res) {
    var collection = db.get('users');
    collection.find({}, function(err, users){
        if (err) throw err;
        res.json(users);
    });
});
router.get('/delete', function(req, res) {
    var collection = db.get('users');
     collection.findOne({token: localStorage.getItem("token")},function(err,docs){
        if(err)
            throw err;
        if(docs.admin==1)
        {
            collection.find({}, function(err, users){
            if (err) throw err;
            res.json(users);
    });
        }


     });
    
});

router.get('/listInbox', function(req, res) {
	 var collection = db.get('users');
	 var mess = db.get('messages');
     collection.findOne({token: localStorage.getItem("token")},function(err,docs){
		if(err)
			throw err;
		if(docs)
		{
			var d = new Date();
			
			mess.find({
        receiver:docs.username
    }, function(err, users){
        if (err) throw err;
        res.json(users);

        
    });
			


		}
	});
});
router.get('/logy', function(req, res) {
     var collection = db.get('userlogs');
     var memo = db.get('users');
     memo.findOne({token: localStorage.getItem("token")},function(err,mems){
            if(err)
            throw err;
        
        if(mems.admin==1){
                collection.find({},function(err,docs){
        if(err)
            throw err;
       res.json(docs);
    });

        }

     });
     
});

router.get('/listOutbox', function(req, res) {
	 var collection = db.get('users');
	 var mess = db.get('messages');
    
     collection.findOne({token: localStorage.getItem("token")},function(err,docs){
		if(err)
			throw err;
		if(docs)
		{
			var d = new Date();
			
			mess.find({
        sender:docs.username
    }, function(err, users){
        if (err) throw err;
        res.json(users);

        
    });
			


		}
	});
});

router.post('/sign', function(req, res){
    var collection = db.get('users');
    var logs = db.get('userlogs');
   
    var userName = req.body.username;
	 collection.findOne({username: userName},function(err,docs){
		if(err)
			throw err;
		if(!docs)
		{
			var toke=uuidv1();
			collection.insert({
        username: req.body.username,
        password: req.body.password,
        name:req.body.name,
        surname:req.body.surname,
        birthday:req.body.birthday,
        gender:req.body.gender,
       	email:req.body.email,
       	admin:0,
       	token:toke
    }, function(err, users){
        if (err) throw err;
       
        localStorage.setItem('token', toke);
        res.json(users);
    });
			var d = new Date();
			var van = d.toISOString().slice(0, 19).replace("T", " ");
		logs.insert({
        username: req.body.username,
        loginTime: van,
        logoutTime:"-",
        token:toke
        
    }, function(err, mems){
        if (err) throw err;

        
    });	



		}
	});

     
    	


});


router.post('/change', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
	 collection.findOne({username: userName},function(err,docs){
		if(err)
			throw err;
		if(docs)
		{
			
			
			collection.update({username:docs.username},{

        username: req.body.newusername,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
       	email:docs.email,
       	admin:docs.admin,
       	token:docs.token
       } 	
    , function(err, users){
        if (err) throw err;
 
        
    });
				
		

		}
	});

     
    	


});
router.post('/change1', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: req.body.newpassword,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:docs.email,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change2', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:req.body.newname,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:docs.email,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change3', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username:docs.username,
        password: docs.password,
        name:docs.name,
        surname:req.body.newsurname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:docs.email,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change4', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:req.body.newdate,
        gender:docs.gender,
        email:docs.email,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change5', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:req.body.newgender,
        email:docs.email,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change6', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:req.body.newemail,
        admin:docs.admin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});
router.post('/change7', function(req, res){
    var collection = db.get('users');
    var userName = req.body.username;
     collection.findOne({username: userName},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
            
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:docs.email,
        admin:req.body.newadmin,
        token:docs.token
       }    
    , function(err, users){
        if (err) throw err;
 
        
    });
                
        

        }
    });

     
        


});



router.post('/login', function(req, res){
    
    var collection = db.get('users');
   var logs = db.get('userlogs');
    var userName = req.body.username;
	 collection.findOne({username: userName},function(err,docs){
		if(err)
			throw err;
		if(docs)
		{
			if(req.body.password==docs.password){
			var toke=uuidv1();
			collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
       	email:docs.email,
       	admin:docs.admin,
       	token:toke}
    , function(err, users){
        if (err) throw err;
        
        localStorage.setItem('token', toke);
        res.json(docs);
          
        
    });
				var d = new Date();
				var man = d.toISOString().slice(0, 19).replace("T", " ");
		logs.insert({
        username: docs.username,
        loginTime: man,
        logoutTime:"-",
        token:toke

        
    }, function(err, mems){
        if (err) throw err;

        
    });


    
		}

		}
	});

});


router.post('/logout', function(req, res){
    
    var collection = db.get('users');
    var logs = db.get('userlogs');
  
     collection.findOne({token: localStorage.getItem("token")},function(err,docs){
        if(err)
            throw err;
        if(docs)
        {
            
           logs.findOne({token: localStorage.getItem("token")},function(err,kakas){
                if(err)
                      throw err;
                  
                var de = new Date();
                var nam = de.toISOString().slice(0, 19).replace("T", " ");
                logs.update({token:localStorage.getItem("token")},{username:docs.username,
                    loginTime:kakas.loginTime,
                    logoutTime:nam,
                    token:kakas.token

                },function(err,memes){



                });


           });
            collection.update({username:docs.username},{

        username: docs.username,
        password: docs.password,
        name:docs.name,
        surname:docs.surname,
        birthday:docs.birthday,
        gender:docs.gender,
        email:docs.email,
        admin:docs.admin,
        token:"-"}
    , function(err, users){
        if (err) throw err;
       
        localStorage.setItem('token', "0");
        res.json(docs);
          
        
    });
                var d = new Date();
                var man = d.toISOString().slice(0, 19).replace("T", " ");
        logs.insert({
        username: docs.username,
        loginTime: man,
        logoutTime:"-",
        token:toke

        
    }, function(err, mems){
        if (err) throw err;

        
    });


    
        

        }
    });

});

router.post('/message', function(req, res){
    var collection = db.get('users');
    var mess = db.get('messages');
    
	 collection.findOne({token: localStorage.getItem("token")},function(err,docs){
		if(err)
			throw err;
		if(docs)
		{
            
			var d = new Date();
			var man = d.toISOString().slice(0, 19).replace("T", " ");
         collection.findOne({username: req.body.username},function(err,mems){
            if(err)
            throw err;
       
        if(req.body.username==mems.username){

            mess.insert({
            sender:docs.username,
            receiver: req.body.username,
            date:man,
            messages:req.body.message
    }, function(err, users){
        if (err) throw err;

        
    });
        }
            


         });
			
			


		}
	});

     
    	


});

router.post('/deleted', function(req, res){
    var collection = db.get('users');
    collection.remove({username: req.body.username }, function(err, docs){
        if (err) throw err;

        res.json(docs);
    });
});





module.exports = router;