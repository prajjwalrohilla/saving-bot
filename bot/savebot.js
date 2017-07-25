var express=require('express');


var path= require('path');


var app =express();
var bodyParser = require('body-parser');
app.set('view engine' ,'ejs');

var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

fs=require('fs');


app.use('/',express.static(__dirname));
var line=[],i=0,j,save=0,idtext,find=0,disp=[],del=0,filename="savingbot.json";
var data = {
   table: []
};




 fs.open(filename,'r',function(err, fd){
    if (err) {
      
      fs.writeFile(filename ,'', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
      });

    } 

    else {
        console.log("copied");
      data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    

    }
  });


if(i==0)
{
line[i]="welcome to botsaver!!";

disp[i]=1;
i++;}

app.get('/',function(req,res) {


res.render('putbot',{textput :line,side: disp});



});





app.post('/',urlencodedParser,function(req,res){
	
	var text=req.body.tod;
 
	line[i]=text;

  disp[i]=0;

  i++; 



 var corct = text.localeCompare("save");
 if(corct!=0&&find<1&&save<1&&del<1)
 {
  console.log(corct);
  corct=text.localeCompare("find");

  if(corct!=0)
   {
      corct=text.localeCompare("delete");


      if(corct!=0)
      {
        line[i]="oops not found...";
        disp[i]=1;
        i++;
       line[i]="Read instructions carefully.";
        disp[i]=1;
        i++;
      }



  }

 }
/*
calling function
 */

saving(text);
finding(text);
deleting(text);


res.render('putbot',{textput :line,side: disp});



});


/* function to save data*/
function saving(check)
{

  var  comp = check.localeCompare("save");

  if(comp==0)
  {
    save=1;
    line[i]="okay , your keyword?";
    disp[i]=1;
    i++;
    
  }

  else
    if(save==1)
    {
         idtext=check;
         save++;
         line[i]="give me your data please...";
         disp[i]=1;
         i++;

    }

else
    if(save==2)
    {
         
         save++;
        line[i]="saved in my memory!!";
        disp[i]=1;
        i++;

       
        data.table.push({idofdata: idtext, textdata: check});

        json = JSON.stringify(data); 
        fs.writeFile(filename , json, 'utf8'); 

 

    }



}


/* function to find something*/

function finding(check)
{

  var comp = check.localeCompare("find");

  if(comp==0)
  {
    find=1;
    line[i]="ok what you want to know about";
    disp[i]=1;
    i++;
     
  }

  else
    if(find==1)
    {
         
        find++;

  
    var flag=0;
    data.table.forEach(function(value) {
  
  if(value.idofdata==check)
  {

    console.log(value);
    line[i]=value.textdata;
    disp[i]=1;
    i++;
   
    flag=1;


  }
});


     if(flag==0)
   { 
    line[i]="oops not found ";
    disp[i]=1;
    i++;
   

    }

    }

  
}



/*function to delete data*/

function deleting(check)
{

  var comp = check.localeCompare("delete");

  if(comp==0)
  {
    del=1;
    line[i]="okay , what you wana delete about?";
    disp[i]=1;
    i++;

  }

  else
    if(del==1)
    {
         
        del++;


var flag=0,pos=0;
    data.table.forEach(function(value) {
  
  if(value.idofdata==check)
  {
    

       data.table.splice(pos,1);  
           line[i]="data deleted successfuly";
          disp[i]=1;
          i++;
         

    flag=1;

var json = JSON.stringify(data); 
    fs.writeFile(filename , json, 'utf8'); 


  }
  pos++;
});

     
     if(flag==0)
   { 
    line[i]="oops not found ";
    disp[i]=1;
    i++;
   

    }

    }

}

/*server */
app.listen(8008,function(){


console.log("start bot");
});