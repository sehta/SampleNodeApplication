var express = require('express');
var router = express.Router();

/* GET process_get. */
router.get('/', function(req, res, next) {
    
    var sampleFile='';
  //  console.log(req);
	if (req.files) {
	//	res.send('No files were uploaded.');
		
        
       var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
              //  res.redirect('back');           //where to go next
            });
        }); 
        
        
 
	/*sampleFile = req.files.sampleFile;
    console.log(sampleFile);
	sampleFile.mv('./public/images/'+sampleFile.name, function(err) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send('File uploaded!');
		}
	});*/
         res.render('process_get', { 'first_name':req.query.first_name,'last_name':req.query.last_name, 'file_name':sampleFile });
    }
   
});

module.exports = router;
