var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    multer = require('multer'),
    moment = require('moment'),
    fs = require('fs'),
    app = express(),
//http = require('http');
cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
var con;

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');

/*Manage size limits for POST/PUT requests*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*Manage CORS Access for ALL requests/reponses*/
app.use(function(req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'origin,X-Requested-With,content-type,accept,x-xsrf-token,Authorization');
    next();
});



app.get('/', (req, res) => {
    try {
        res.send('<h1>Server Running</h1>');
    } catch (err) {
        console.log("error for start file " + err);
        throw err;
    }
    console.log("connected");

});

//mysql connection check
function handleDisconnect(){
    //mysql configuration
    con =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Laptop@22197',
        database: 'equiapp2',
        port: 3306,
        multipleStatements: true,
        // to convert bit to boolean
        typeCast: function castField( field, useDefaultTypeCasting ) {

            // To cast bit fields that have a single-bit in them.
            if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

                var bytes = field.buffer();
                return( bytes[ 0 ] === 1 );

            }

            return( useDefaultTypeCasting() );

        }
    });
    con.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            console.log("Reconnected");
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
handleDisconnect();

// assets list
app.post('/lists', (req, res) => {
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    const query = `select poolItemKeyPk as itemkey,poolassetid as assetid,poolItemPONumber as poNumber,
    locName as location ,buiName as building,layname as layer from  dataitempool
    inner join linkitemlayer on(dataitempool.poolItemKeyPK=linkitemlayer.linkItemKeyPK)
    inner join datalocation on(SUBSTRING(linkitembuildingFK, 1, 11)=loclocationPK)
    inner join databuilding on(linkitembuildingFK=buibuildingpk)
    left join  datalayer on(laylayerpk=linkitemlayerfk)
    where linkItemBuildingFK like ? and locIsActive=1 and buiIsActive=1;`;
    con.query(query,[loc],function(err,result){
        if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        console.log(result);
        res.status(200).json(result);
    });
});

// variable asset parameter
app.post('/getVarAsset',(req,res) => {
    console.log(req.body.AssetId);
    let query = 'select linkItemParamValue,parParameterName from linkitemparametervalue inner join linkitemparameter on(linkitemparametervalue.linkItemParameterFK=linkitemparameter.linkItemParameterPK) inner join dataparameter on(dataparameter.parParameterPK=linkitemparameter.linkParameterFK) where linkItemKeyFK IN (select poolItemKeyPK from dataitempool where poolItemKeyPk=?)';
    con.query(query,[req.body.AssetId],function (err,result) {
       if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        else {
           console.log(result);
           res.status(200).json(result);
       }
    })
});

// mandatory asset parameter
app.post('/getAsset',(req,res) => {
    console.log(req.body.AssetId);
    let query = 'select poolAssetID as AssetId, iteName as AssetType, poolProcurementDate as Procurement,poolCurrency as Currency,iteDepreciationValue as Depreciation, iteCriticality as Criticality, poolIsWarrantyOrAMC as AmcOrWarranty ,poolItemPONumber as PoNo,poolQuantity as Quantity,poolIsBulk as Bulk,pooIsWorking as Working,dataitempool.poolURLItemPO as pourl,poolCost as Cost from dataitempool inner join dataitem on(dataitempool.poolItemFK=dataitem.iteItemPK) where poolItemKeyPk=?;';
    con.query(query,[req.body.AssetId],function (err,result) {
        if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        if (result.length === 0) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        console.log(result);
        res.status(200).json(result);
    })
});


//check header null
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

//super user login
function loginAsSuperuser(username, loginquery, uname, req, res) {
    con.query(loginquery, [uname, 0], function (err, result) {
        if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        if (result.length === 0) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        //checking credential is valid or not
        result.forEach(element => {
            bcrypt.compare(req.body.password, element.admpwd, function (err, result) {
                if (result) {
                    var admindetail = "select linkRoleFK,linkSpace,admName as name from linkadminaccess join dataadmin on(dataadmin.admAdminPK=linkadminaccess.linkAdminFK) where linkAdminFK=?";
                    con.query(admindetail, [username], function (err, admin) {
                        if (err) throw err;
                        let highestrole = 7;
                        let loc;
                        admin.forEach(element => {
                            if (parseInt(element.linkRoleFK) <= highestrole) {
                                highestrole = parseInt(element.linkRoleFK);
                                loc = element.linkSpace;
                            }
                        });
                        const JWTToken = jwt.sign({
                                _id: username,
                                _firstlogin: false,
                                _name: admin[0].name,
                                _role: highestrole,
                                _location: loc
                            },
                            'secret',
                            {
                                expiresIn: '1h'
                            });
                        return res.status(200).json({
                            token: JWTToken,
                        });
                    });
                } else {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            });
        });

    });
}

//user login
function loginAsAdmin(username, loginquery, uname, req, res) {
    con.query(loginquery, [uname], function (err, result) {
        if (err) res.status(401).json({
            failed: 'Unauthorized Access'
        });
        if (result.length === 0) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        //checking credential is valid or not
        result.forEach(element => {
            bcrypt.compare(req.body.password, element.admpwd, function (err, result) {
                if (result) {
                    let dateobj = new Date(element.doj);
                    let date = dateobj.getDate() + "";
                    if (date.length === 1) {
                        date = "0" + date;
                    }
                    let month = dateobj.getMonth() + 1 + "";
                    if (month.length === 1) {
                        month = "0" + month;
                    }
                    let year = dateobj.getFullYear() + "";
                    bcrypt.compare(username + "@" + date + month + year, element.admpwd, function (err, firstlogin) {
                        if (!firstlogin) {
                            //access admin details
                            var admindetail = "select linkRoleFK,linkSpace from linkadminaccess where linkAdminFK=?";
                            con.query(admindetail, [username], function (err, admin) {
                                if (err) throw err;
                                let highestrole = 7;
                                let loc;
                                admin.forEach(element => {
                                    if (parseInt(element.linkRoleFK) <= highestrole) {
                                        highestrole = parseInt(element.linkRoleFK);
                                        loc = element.linkSpace;
                                    }
                                });
                                const JWTToken = jwt.sign({
                                        _id: username,
                                        _firstlogin: false,
                                        _name: element.name,
                                        _role: highestrole,
                                        _location: loc
                                    },
                                    'secret',
                                    {
                                        expiresIn: '1h'
                                    });
                                return res.status(200).json({
                                    token: JWTToken,
                                });
                            });
                        } else {
                            const JWTToken = jwt.sign({
                                    _id: username,
                                    _firstlogin: true,
                                    _name: element.name
                                },
                                'secret',
                                {
                                    expiresIn: '1h'
                                });
                            return res.status(200).json({
                                token: JWTToken,
                                id: username,
                                name: element.name,
                                firstLogin: true
                            });
                        }
                    })
                } else {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            });
        });

    });
}

//login
app.post('/data/checklogin', (req, res) => {
    //access login credential
    console.log(req.body);
    let userId = req.body.userId;
    if( !userId || !req.body.password || isNaN(userId) ){
        res.send('false');
    }
    console.log("Checking Authorization");
    let loginquery;
    let uname;
    if ( req.body.superUserCheck || isNaN(userId) ) {
        if(!req.body.superUserId){
            res.send('false');
        }
        uname = req.body.superUserId;
        loginquery = "SELECT admpwd,admDOJ as doj,admName as name FROM dataadmin inner join linkadminaccess on(linkadminaccess.linkAdminFK=dataadmin.admadminPk) where admAdminPk= ? and linkRoleFK = ?  and admIsActive=true";
        loginAsSuperuser(userId, loginquery, uname, req, res);
    } else {
        uname = userId;
        loginquery = "SELECT admpwd,admDOJ as doj,admName as name FROM dataadmin inner join linkadminaccess on(linkadminaccess.linkAdminFK=dataadmin.admadminPk) where admAdminPk= ?  and admIsActive=true";
        loginAsAdmin(userId, loginquery, uname, req, res);
    }

});


//access profile details
app.post("/data/user/profile/access", function(req, res) {
    let accessadmindataquery = `select admPhotoURL as url,admMobileNo as mobnum,admFaxNo as faxnum,
    admEmail as email,admName as name, admVoIP as voip,admOffLandLineNo	as landlinenum from dataadmin 
    where admAdminPK = ?`;
    con.query(accessadmindataquery, [req.body.id], function(err, result) {
        console.log(result[0]);
        res.end(JSON.stringify(result[0]));
    })
});


//access roles based on user login
app.post("/data/profile/roles", function(req, res) {
    let locationinfo = `select linkadminfk as adminid,linkRoleFK as roleid,linkSpace as locid,case 
        when linkRoleFK=0 then 'All Location Access'
        when linkRoleFK=1  then (case when linkSpace='00' then 'All Location Access'
        when length(linkSpace)=2 then (select geoName from datageography where geoGeographyPK=linkSpace)
        when  length(linkSpace)=4 then (select couName from datacountry where couCountryPK=linkSpace)
        when  length(linkSpace)=6 then (select staName from datastate where staStatePK=linkSpace)
        when  length(linkSpace)=8 then (select citName from datacity where citCityPK=linkSpace)
        when length(linkSpace)=11 then (select locName from datalocation where locLocationPK=linkSpace)
        when length(linkSpace)=13 then (select buiName from databuilding where buiBuildingPK=linkSpace)
        end) 
        when linkRoleFK=2 then (select geoName from datageography where geoGeographyPK=linkSpace)
        when linkRoleFK=3 then (select couName from datacountry where couCountryPK=linkSpace)
        when linkRoleFK=4 then (select staName from datastate where staStatePK=linkSpace)
        when linkRoleFK=5 then (select citName from datacity where citCityPK=linkSpace)
        when linkRoleFK=6 then (select locName from datalocation where locLocationPK=linkSpace)
        when linkRoleFK=7 then (select buiName from databuilding where buiBuildingPK=linkSpace)
        end as locname,
        case 
        when linkRoleFK=0 then 'Superuser'
        when linkRoleFK=1  then 'Corporate Admin'
        when linkRoleFK=2 then 'Geography Admin'
        when linkRoleFK=3 then 'Country Admin'
        when linkRoleFK=4 then 'State Admin'
        when linkRoleFK=5 then 'City Admin'
        when linkRoleFK=6 then 'Location Admin'
        when linkRoleFK=7 then 'Building Admin'
        end as admintype
        from linkadminaccess where linkadminfk = ?`;

    con.query(locationinfo,[req.body.adminid], (err, result) => {

        if (err) throw err;
        res.end(JSON.stringify(result))
    })
});

app.post("/data/user/profileimage", function(req, res) {
    console.log(req.body);
    let accessadmindataquery = `select admPhotoURL as url from dataadmin 
    where admAdminPK = ?`;
    con.query(accessadmindataquery, [req.body.id], function(err, result) {
        console.log(result);
        res.sendFile(result[0].url);
    })
});

app.post('/accessHierarchy', async function (req, res) {

    let hList = [];
    console.log(req.body.locid);
    var locid = req.body.locid;
    while (locid.length > 0) {
        locid = await createHierarchyList(hList, locid);
    }
    res.end(JSON.stringify(hList))
});

async function createHierarchyList(hList, locid) {
    return new Promise((resolve, reject) => {
        if (locid.length === 13) {
            con.query('select buiName as currentLoc,buiLocationFK as previousLoc from databuilding where buiBuildingPk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve(result[0].previousLoc);
            })


        } else if (locid.length === 11) {

            con.query('select locName as currentLoc,locCityFK as previousLoc from datalocation where locLocationPk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve(result[0].previousLoc);
            })
        } else if (locid.length === 8) {
            con.query('select citName as currentLoc,citStateFK as previousLoc from datacity where citCityPk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve(result[0].previousLoc);
            })
        } else if (locid.length === 6) {
            con.query('select staName as currentLoc,staCountryFK as previousLoc from datastate where staStatePk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve(result[0].previousLoc);
            })
        } else if (locid.length === 4) {
            con.query('select couName as currentLoc,couGeographyFK as previousLoc from datacountry where couCountryPk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve(result[0].previousLoc);
            })
        } else if (locid.length === 2) {
            con.query('select geoName as currentLoc from datageography where geoGeographyPk=' + locid, (err, result) => {
                if (err) throw err;
                hList.push(result[0].currentLoc);
                resolve('');
            })
        }

    });

}

//access amc-warranty
app.post("/amc-warranty", function(req, res) {
    console.log(req.body);
    let query = `select amcPOPK as PO, linkProcurementDate as startDate, 
                linkExpiryDate as endDate, amcBaseContractCost as cost ,
                amcURLAMCPO as url,
                '1' as amc
                from dataamc inner join linkitemamc on(dataamc.amcPOPK=linkitemamc.linkAMCPOFK)
                where linkItemKeyFK=? order by linkExpiryDate;`;
    con.query(query,[req.body.key],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            console.log(result);
            query = `select poolItemPONumber as PO, poolURLItemPO as url, linkItemAllocDate as startDate,
                     warExpiryDate as expDate,poolCost as cost,'0' as amc 
                     from datawarranty inner join linkitemlayer on 
                     (datawarranty.warItemKeyFK=linkitemlayer.linkItemKeyPK)
                     inner join dataitempool on(dataitempool.poolitemkeypk=linkitemlayer.linkitemkeypk)
                     where linkItemKeypk=? order by warExpiryDate;`;
            con.query(query,[req.body.key],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else if(resdata.length === 0) {
                    res.status(200).json({
                        amcData: result,
                    });
                } else if(result.length === 0) {
                    res.status(200).json({
                        warrantyData: resdata,
                    });
                } else {
                    res.status(200).json({
                        amcData: result,
                        warrantyData: resdata,
                    });
                }
            });
        }
    });
});

//get pm file
app.post("/getPmFile", function(req, res) {
    console.log(req.body);
    const query = `select pmServiceReportURL as url from datapmscheduledetails where pmPMScheduleDetailsPK = ?;`;
    con.query(query, [req.body.id], function(err, result) {
        console.log(result);
        res.sendFile(result[0].url);
    })
});

//get amc file
app.post("/getAmcFile", function(req, res) {
    console.log(req.body);
    const query = `select amcURLAMCPO as url from dataamc where amcPOPK = ?;`;
    con.query(query, [req.body.id], function(err, result) {
        console.log(result);
        res.sendFile(result[0].url);
    })
});

//access pm
app.post("/getPmData", function(req, res) {
    console.log(req.body);
    const pmQuery = `select pmPMScheduleDetailsPK as SNo, amcPOPK as poNo,pmStartDate as start,pmEndDate as end,pmDateOfService as service,
                     pmExtraCostIncurred as extraCost,pmServiceReportURL as url,pmComments as comments,pmIsServiceDone as status
                     from dataamc inner join linkitemamc on(dataamc.amcPOPK=linkitemamc.linkAMCPOFK)
                     inner join datapmscheduledetails on(datapmscheduledetails.pmItemAMCFK=linkitemamc.linkItemAMCPK)
                     where linkItemKeyFK=? and pmEndDate <= now() order by  pmIsServiceDone asc,pmEndDate desc;`;
    con.query(pmQuery,[req.body.key],(err, result) => {

        if (err) throw err;
        res.end(JSON.stringify(result));
    })
});

//update pm
app.post("/updatePmData", function(req, res) {
    console.log(req.body);
    upload(req,res,function(err) {
        console.log(req.file);
        console.log(req.file.path);
        console.log(req.body.data);
        let data = JSON.parse(req.body.data);
        console.log(data);
        let start = data.start.split("/").reverse().join("-");
        let end = data.end.split("/").reverse().join("-");
        let service = data.service.split("/").reverse().join("-");
        console.log(start+""+end+" "+service);
        const pmQuery = `update datapmscheduledetails set pmStartDate = ?, pmEndDate = ?,
                     pmDateOfService=?,pmExtraCostIncurred=?,pmComments=?,pmIsServiceDone=?,
                     pmServiceReportURL=? where pmPMScheduleDetailsPK = ?;`;
        con.query(pmQuery,[start,end,service,data.extra,data.comment,data.status,req.file.path,data.SNo],(err, result) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }else{
                res.end(JSON.stringify(result));
            }
        });
    });
});

//get vendor list
app.get("/getVendorList",function (req,res) {
    const query = `select venVendorPK as Vid, venName as Name from datavendor order by Name;`;
    con.query(query,(err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

//get amcPo list
app.get("/getAmcPoList",function (req,res) {
    const query = `select amcPOPK as po, 
                   amcBaseContractCost as cost, amcURLAMCPO as url, linkItemVendorFK as VId,
                   linkProcurementDate as ProcDate, linkExpiryDate as ExpDate from dataamc inner join linkitemamc on
                   (dataamc.amcPOPK = linkitemamc.linkAMCPOFK) where linkItemAMCPK IN 
                   (select MAX(linkItemAMCPK) from linkitemamc group by linkAMCPOFK);`;
    con.query(query,(err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.end(JSON.stringify(result));
        }
    });
});


//get amcAsset list
app.post("/getAmcAssetList",function (req,res) {
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    const today = moment(new Date()).format("YYYY-MM-DD");
    const query = `select poolAssetId as Id, poolItemKeyPK as itemKey from linkitemlayer 
                   inner join dataitempool on(linkitemlayer.linkItemKeyPK=dataitempool.poolitemkeypk)
                   where linkItemBuildingFK like ?
                   and
                   linkitemkeypk not in
                   (select linkitemkeyfk from linkitemamc where linkExpiryDate > ?)  
                   and
                   linkitemkeypk not in
                   (select warItemKeyFK from datawarranty where warExpiryDate > ?)`;
    con.query(query,[loc,today, today],(err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

//get location of item
app.post("/getLocation",function (req,res) {
    console.log(req.body);
    const query = `select SUBSTRING(linkitembuildingFK, 1, 11) as location from linkitemlayer where linkItemKeyPK = ?;`;
    con.query(query,[req.body.key],(err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

//get location of all item
app.post("/getAllLocation",function (req,res) {
    console.log(req.body);
    const resultLoc = [];
    for (let i = 0; i < req.body.data.length; i++) {
        const query = `select SUBSTRING(linkitembuildingFK, 1, 11) as location from linkitemlayer where linkItemKeyPK = ?;`;
        con.query(query,[req.body.data[i].Key],(err, result) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }else{
                console.log(req.body.data[i].Key+ ' ' +result);
                if (result.length !== 0) {
                    result.forEach(dat => {
                        console.log(dat);
                        resultLoc.push([req.body.data[i].Key, dat.location]);
                    });
                } else {
                    resultLoc.push([req.body.data[i].Key, null]);
                }
                if (i === req.body.data.length - 1) {
                    console.log(resultLoc);
                    res.end(JSON.stringify(resultLoc));
                }
            }
        });
    }
});

//create amc with upload of file
app.post("/createAmc", function (req, res) {
    console.log("reading body");
    console.log(req.body);
    upload(req, res, function (err) {
        console.log(req.file);
        // console.log(req.body.file);
        console.log(req.file.path);
        // const d = fs.readFileSync(req.file);
        // console.log(d);
        let data = JSON.parse(req.body.data);
        console.log(data);
        let proc = data.procDate.split("/").reverse().join("-");
        let exp = data.expDate.split("/").reverse().join("-");
        let query = `insert into dataamc(amcPOPK,amcVendorFK,amcBaseContractCost,amcURLAMCPO) values(?,?,?,?);`;
        con.query(query, [data.poNo, data.vendor, data.cost, req.file.path], (err, result) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                console.log("dataamc created succesfully");
                query = 'select MAX(linkItemAMCPK) as id from linkitemamc;';
                con.query(query, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        const item = result[0].id + 1;
                        query = `insert into linkitemamc(linkItemAMCPK,linkItemVendorFK, linkAMCPOFK,
                            linkItemKeyFK, linkBaseItemCost, linkProcurementDate, linkExpiryDate) values(?,?,?,?,?,?,?);`;
                        con.query(query, [item, data.vendor, data.poNo, data.key, data.cost, proc, exp], (err, ress) => {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                console.log("amc insert success");
                                query = 'select MAX(linklocationamcpk) as id from linkLocationAMC;';
                                con.query(query, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.status(401).json({
                                            failed: 'Unauthorized Access'
                                        });
                                    } else {
                                        const item = result[0].id + 1;
                                        query = `insert into linkLocationAMC(linkLocationAMCPK,linkBaseLocationCost,linkAMCPOFK,linkLocationFK,linkpmannualexpiry) values(?,?,?,?,?);`;
                                        con.query(query, [item, data.cost, data.poNo, data.location, "-03-31"], (err, resData) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(401).json({
                                                    failed: 'Unauthorized Access'
                                                });
                                            } else {
                                                res.end("true");
                                            }
                                        });

                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});


//create amc of multiple data with upload of file
app.post("/createAllAmc", function (req, res) {
    console.log("reading body");
    console.log(req.body);
    upload(req, res, function (err) {
        let data = JSON.parse(req.body.data);
        console.log(data);
        let proc = data.procDate.split("/").reverse().join("-");
        let exp = data.expDate.split("/").reverse().join("-");
        let query = `insert into dataamc(amcPOPK,amcVendorFK,amcBaseContractCost,amcURLAMCPO) values(?,?,?,?);`;
        con.query(query, [data.poNo, data.vendor, data.totalCost, req.file.path], (err, result) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                console.log("dataamc created succesfully");
                query = 'select MAX(linkItemAMCPK) as id from linkitemamc;';
                con.query(query, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        for (let i = 0; i < data.asset.length; i++) {
                            console.log(result[0].id);
                            const item = result[0].id + i + 1;
                            query = `insert into linkitemamc(linkItemAMCPK,linkItemVendorFK, linkAMCPOFK,
                                     linkItemKeyFK, linkBaseItemCost, linkProcurementDate, linkExpiryDate) values(?,?,?,?,?,?,?);`;
                            con.query(query, [item, data.vendor, data.poNo, data.asset[i].Key, data.asset[i].Cost, proc, exp], (err, ress) => {
                                if (err) {
                                    console.log(err);
                                    res.status(401).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    console.log("amc insert success");
                                    if (i === data.asset.length - 1) {
                                        res.end("true");
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    });
});

//insert amc location
app.post("/insertLocation", function(req, res) {
    console.log(req.body);
    let data = req.body;
    let locationData=new Map();
    for(let i=0;i<data.location.length;i++)
    {
        if(locationData.has(data.location[i][1]))
        {
            let prevcost=locationData.get(data.location[i][1]);
            locationData.set(data.location[i][1],data.asset[i].Cost+prevcost);
        }else{
            locationData.set(data.location[i][1],data.asset[i].Cost);
        }
    }
    let locData=Array.from(locationData);
    console.log(locData);
    for (let i = 0; i < locData.length; i++) {
        let query = `select linkLocationAMCPK,linkBaseLocationCost from linkLocationAMC where linkAMCPOFK=? and linkLocationFK=?;`;
        con.query(query, [data.poNo, locData[0][i]], (err, resData) => {
            console.log(resData);
            console.log(locData[0][i]+" "+locData[i][1]);
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else if (resData.length === 0) {
                query = 'select MAX(linklocationamcpk) as id from linkLocationAMC;';
                con.query(query, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        const item = result[0].id + i + 1;
                        query = `insert into linkLocationAMC (linkLocationAMCPK,linkBaseLocationCost,
                                                             linkAMCPOFK,linkLocationFK,linkpmannualexpiry) values(?,?,?,?,?);`;
                        con.query(query, [item, locData[i][1], data.poNo, locData[0][i],"-03-31"], (err, resData) => {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                if (i === locData.length - 1) {
                                    res.end("true");
                                }
                            }
                        });
                    }
                })
            } else {
                let cost = resData[0].linkBaseLocationCost + locData[i][1];
                query = `update linklocationamc set linkBaseLocationCost = ? where linklocationamcpk=?;`;
                con.query(query, [cost, resData[0].linkLocationAMCPK], (err, resData) => {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        if (i === req.body.asset.length - 1) {
                            res.end("true");
                        }
                    }
                });
            }
        });
    }
});

//update amc
app.post("/updateAmc", function (req, res) {
    let data=req.body;
    let proc = req.body.procDate.split("/").reverse().join("-");
    let exp = req.body.expDate.split("/").reverse().join("-");
    let query = `update dataamc set amcBaseContractCost=? where amcPOPK=?;`;
    con.query(query, [req.body.totalCost, req.body.poNo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            query = 'select MAX(linkItemAMCPK) as id from linkitemamc;';
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    const item = result[0].id + 1;
                    query = `insert into linkitemamc(linkItemAMCPK,linkItemVendorFK, linkAMCPOFK, linkItemKeyFK, linkBaseItemCost, linkProcurementDate, linkExpiryDate) values(?,?,?,?,?,?,?);`;
                    con.query(query, [item, req.body.vendor, req.body.poNo, req.body.key, req.body.cost, proc, exp], (err, ress) => {
                        if (err) {
                            console.log(err);
                            res.status(401).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            query = `select linkLocationAMCPK,linkBaseLocationCost from linkLocationAMC where linkAMCPOFK=? and linkLocationFK=?;`;
                            con.query(query, [req.body.poNo, req.body.location], (err, resData) => {
                                console.log(resData);
                                if (err) {
                                    console.log(err);
                                    res.status(401).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else if (resData.length === 0) {
                                    query = 'select MAX(linklocationamcpk) as id from linkLocationAMC;';
                                    con.query(query, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            res.status(401).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            const item = result[0].id + 1;
                                            query = `insert into linkLocationAMC (linkLocationAMCPK,linkBaseLocationCost,
                                                linkAMCPOFK,linkLocationFK,linkpmannualexpiry) values(?,?,?,?,?);`;
                                            con.query(query, [item, data.cost, data.poNo, data.location,"-03-31"], (err, resData) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.status(401).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    res.end("true");
                                                }
                                            });
                                        }
                                    })
                                } else {
                                    let cost = resData[0].linkBaseLocationCost + data.cost;
                                    query = `update  linklocationamc set linkBaseLocationCost = ? where linklocationamcpk=?;`;
                                    con.query(query, [cost, resData[0].linkLocationAMCPK], (err, resData) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(401).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            res.end("true");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//update all amc
app.post("/updateAllAmc", function (req, res) {
    let data=req.body;
    let proc = req.body.procDate.split("/").reverse().join("-");
    let exp = req.body.expDate.split("/").reverse().join("-");
    let query = `update dataamc set amcBaseContractCost=? where amcPOPK=?;`;
    con.query(query, [req.body.totalCost, req.body.poNo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            query = 'select MAX(linkItemAMCPK) as id from linkitemamc;';
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    for (let i = 0; i < req.body.asset.length ; i++) {
                        const item = result[0].id + i + 1;
                        query = `insert into linkitemamc(linkItemAMCPK,linkItemVendorFK, linkAMCPOFK, linkItemKeyFK, linkBaseItemCost, linkProcurementDate, linkExpiryDate) values(?,?,?,?,?,?,?);`;
                        con.query(query, [item, req.body.vendor, req.body.poNo, req.body.asset[i].Key, req.body.asset[i].Cost, proc, exp], (err, ress) => {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                if (i === req.body.asset.length - 1) {
                                    res.end("true");
                                }
                            }
                        });
                    }
                }
            });
        }
    });
});

//view all amc
app.post("/viewAllAmc", function (req, res) {
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    let query = `select amcpopk as po, linkProcurementDate as ProcDate, amcURLAMCPO as url,
                 linkExpiryDate as ExpDate, amcBaseContractCost as cost from dataamc 
                 inner join linkitemamc on(linkitemamc.linkAMCPOFK=dataamc.amcPOPK)
                 inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=linkitemamc.linkItemKeyFK)
                 where linkItemBuildingFK like ?
                 group by amcpopk;`;
    con.query(query,[loc], (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send({
                data: result
            });
        }
    });
});

//fetch asset list amc
app.post("/fetchAssetList/Amc", function (req, res) {
    console.log(req.body);
    let query = `select poolAssetId as Id, linkBaseItemCost as Cost 
                 from linkitemamc inner join dataitempool 
                 on (linkitemamc.linkItemKeyFK = dataitempool.poolItemKeyPk) where linkAMCPOFK=?;`;
    con.query(query,[req.body.po], function (err, resultData) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send({
                data: resultData
            });
        }
    });
});

//manage all pm
app.post("/fetchAll/Amc-Warranty", function (req, res) {
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    let query = `select * from (select amcPOPK as po, amcBaseContractCost as cost, amcURLAMCPO as url, linkProcurementDate as ProcDate,
                 linkExpiryDate as ExpDate,linkItemAMCPK as PoKey, 1 as amc,max(pmendDate) as maxpm from datapmscheduledetails
                 inner join linkitemamc on(linkitemamc.linkItemAMCPK=datapmscheduledetails.pmItemAMCFK)
                 inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=linkitemamc.linkItemKeyFK)
                 inner join dataitempool on(dataitempool.poolitemkeypk=linkitemamc.linkItemKeyFK)
                 inner join dataamc on(dataamc.amcPOPK=linkitemamc.linkAMCPOFK)
                 where pmItemamcfk is not null and linkItemBuildingFK like ?
                 group by amcPOPK) as amc where  maxpm >= DATE_SUB(now(),INTERVAL 1 YEAR)
                 and now() <= DATE_ADD(maxpm,INTERVAL 1 YEAR)
                 union
                 select * from (select poolAssetID as po, poolCost as cost, poolURLItemPO as url, poolProcurementDate as ProcDate,
                 warExpiryDate as ExpDate,warWarrantyPK as PoKey, 0 as amc,max(pmendDate) as maxpm from datapmscheduledetails
                 inner join datawarranty on(datawarranty.warWarrantyPK=datapmscheduledetails.pmWarrantyFK)
                 inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=datawarranty.warItemKeyFK)
                 inner join dataitempool on(dataitempool.poolitemkeypk=datawarranty.warItemKeyFK)
                 where pmWarrantyFK is not null and linkItemBuildingFK like ?
                 group by pmWarrantyFK) as war where maxpm >= DATE_SUB(now(),INTERVAL 1 YEAR)
                 and now() <= DATE_ADD(maxpm,INTERVAL 1 YEAR) ;`;
    con.query(query,[loc,loc], function (err, resultData) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send({
                data: resultData
            });
        }
    });
});

//schedule all pm
app.post("/fetchAll/schedulePm", function (req, res) {
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    let query = `select amcPOPK as po, amcBaseContractCost as cost, amcURLAMCPO as url, linkProcurementDate as ProcDate,
                 linkExpiryDate as ExpDate, linkItemAMCPK as PoKey, 1 as amc from dataamc
                 inner join linkitemamc on(dataamc.amcPOPK = linkitemamc.linkAMCPOFK)
                 inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=linkitemamc.linkItemKeyFK)
                 where linkItemBuildingFK like ? and linkItemAMCPK not in
                 (select pmItemAMCFK from datapmscheduledetails where pmItemAMCFK is not null)
                 group by amcpopk
                 union
                 select poolAssetID as po, poolCost as cost, poolURLItemPO as url, poolProcurementDate as ProcDate,
                 warExpiryDate as ExpDate, warWarrantyPK as PoKey, 0 as amc from datawarranty
                 inner join linkitemlayer on(linkitemlayer.linkItemKeyPK=datawarranty.warItemKeyFK)
                 inner join dataitempool on(dataitempool.poolItemKeyPK=linkitemlayer.linkItemKeyPK)
                 where linkItemBuildingFK like ? and warWarrantyPK not in
                 (select pmWarrantyFK from datapmscheduledetails where pmWarrantyFK is not null);`;
    con.query(query,[loc,loc], function (err, resultData) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send({
                data: resultData
            });
        }
    });
});

//fetch pm for amc
app.post("/fetchPm/Amc", function (req, res) {
    console.log(req.body);
    let query = `select pmPMScheduleDetailsPK as SNo, pmStartDate as start,pmEndDate as end,
                 pmDateOfService as service, pmExtraCostIncurred as extraCost,pmServiceReportURL as url,
                 pmComments as comments,pmIsServiceDone as status from datapmscheduledetails
                 where pmEndDate >= DATE_SUB(now(),INTERVAL 1 YEAR)
                 and now() <= DATE_ADD(pmEndDate,INTERVAL 1 YEAR) and pmItemamcfk =?;`;
    con.query(query,[req.body.key], function (err, resultData) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send(resultData);
        }
    });
});

//fetch pm for warranty
app.post("/fetchPm/Warranty", function (req, res) {
    console.log(req.body);
    let query = `select pmPMScheduleDetailsPK as SNo,pmStartDate as start,pmEndDate as end,
                 pmDateOfService as service, pmExtraCostIncurred as extraCost,pmServiceReportURL as url,
                 pmComments as comments,pmIsServiceDone as status from datapmscheduledetails 
                 where pmEndDate >= DATE_SUB(now(),INTERVAL 1 YEAR)
                 and now() <= DATE_ADD(pmEndDate,INTERVAL 1 YEAR) and pmWarrantyFK=?;`;
    con.query(query,[req.body.key], function (err, resultData) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).send(resultData);
        }
    });
});

//insert pm for amc
app.post("/insertPm/Amc", function (req, res) {
    console.log(req.body);
    let query = 'select MAX(pmPMScheduleDetailsPK) as id from datapmscheduledetails;';
    con.query(query, function (err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            for (let i = 0; i < req.body.length; i++) {
                const item = result[0].id + i + 1;
                let start = moment(req.body.start[i]).format('YYYY-MM-DD');
                let end = moment(req.body.end[i]).format('YYYY-MM-DD');
                console.log(start+" "+end);
                query = `insert into datapmscheduledetails (pmPMScheduleDetailsPK,pmPMScheduleFK,pmItemAMCFK,pmStartDate,pmEndDate,
                         pmIsServiceDone) values (?,?,?,?,?,?);`;
                con.query(query, [item, null, req.body.sno, start, end, req.body.status], function (err, resultData) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        if (i === req.body.length - 1) {
                            res.status(200).send(resultData);
                        }
                    }
                });
            }
        }
    });
});

//insert pm for warranty
app.post("/insertPm/Warranty", function (req, res) {
    console.log(req.body);
    let query = 'select MAX(pmPMScheduleDetailsPK) as id from datapmscheduledetails;';
    con.query(query, function (err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else {
            for (let i = 0; i < req.body.length; i++) {
                const item = result[0].id + i + 1;
                let start = moment(req.body.start[i]).format('YYYY-MM-DD');
                let end = moment(req.body.end[i]).format('YYYY-MM-DD');
                query = `insert into datapmscheduledetails (pmPMScheduleDetailsPK,pmPMScheduleFK,pmWarrantyFK,pmStartDate,pmEndDate,
                         pmIsServiceDone) values (?,?,?,?,?,?);`;
                con.query(query,[item,null,req.body.sno,start,end,req.body.status], function (err, resultData) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        res.status(200).send(resultData);
                    }
                });
            }
        }
    });
});


app.listen(config.port, function() {
    console.log("server running @ " + config.port);
});