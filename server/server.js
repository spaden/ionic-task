var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    fs = require('fs'),
    app = express(),
//http = require('http');
cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
var con;

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
    let items = [];
    /*rotateImg = 0
    lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    clicked = 1
    images = [
        'bandit',

    ]
    for (let i = 0; i < 1000; i++) {
        items.push({
            name: i + ' - ' + images[rotateImg],
            imgHeight: Math.floor(Math.random() * 50 + 150),
        })
    }*/

    /*try {
        res.json(items)
    } catch (err) {
        console.log("error")
        throw err
    }
    console.log("route working")*/
    console.log(req.body);
    let loc = req.body.location;
    loc += '%';
    console.log(loc);
    /*if (req.body.location!==undefined&&req.body.location!=='0'){
        console.log(req.body.role,req.body.location);
        const fetchQuery = 'select poolAssetID as AssetId, poolItemPONumber as PO, ' +
            'buiBuildingAddress as Location from dataitempool inner join linkitemlayer ' +
            'on(dataitempool.poolItemKeyPK=linkitemlayer.linkItemKeyPK) inner join databuilding ' +
            'on(linkitemlayer.linkItemBuildingFK=buiBuildingPK) where buiIsActive=1 and buiBuildingPK IN ' +
            '(select linkSpace from linkadminaccess where linkRoleFK = ? and linkSpace=?);';
        con.query(fetchQuery,[req.body.role,req.body.location],function (err,result) {
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
            });

    }else{
        console.log(req.body);
        const fetchQuery = 'select poolAssetID as AssetId, poolItemPONumber as PO, buiBuildingAddress as Location from dataitempool inner join linkitemlayer on(dataitempool.poolItemKeyPK=linkitemlayer.linkItemKeyPK) inner join databuilding on(linkitemlayer.linkItemBuildingFK=buiBuildingPK) where buiIsActive=1 and buiBuildingPK IN (select linkSpace from linkadminaccess);';
        con.query(fetchQuery,function (err,result) {
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
        });
    }*/
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
    let query = 'select linkItemParamValue,parParameterName from linkitemparametervalue inner join linkitemparameter on(linkitemparametervalue.linkItemParameterFK=linkitemparameter.linkItemParameterPK) inner join dataparameter on(dataparameter.parParameterPK=linkitemparameter.linkParameterFK) where linkItemKeyFK IN (select poolItemKeyPK from dataitempool where poolAssetID=?)';
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

// mandatory asset parameter
app.post('/getAsset',(req,res) => {
    console.log(req.body.AssetId);
    let query = 'select poolAssetID as AssetId, iteName as AssetType, poolProcurementDate as Procurement,poolCurrency as Currency,iteDepreciationValue as Depreciation, iteCriticality as Criticality, poolIsWarrantyOrAMC as AmcOrWarranty ,poolItemPONumber as PoNo,poolQuantity as Quantity,poolIsBulk as Bulk,pooIsWorking as Working, poolCost as Cost from dataitempool inner join dataitem on(dataitempool.poolItemFK=dataitem.iteItemPK) where poolAssetID=?';
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
        /*const l = fs.readFileSync('C:\\Users\\Lenovo\\Desktop\\1234.jpg',{encoding: 'base64'});
        console.log(l);
        res.send({
            data: JSON.stringify(result[0]),
            img: l,
        });*/
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


app.listen(config.port, function() {
    console.log("server running @ " + config.port);
});