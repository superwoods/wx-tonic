'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const libIndex = require('./lib/index');
const pagesIndex = require('./pages/index');
const pagesReadme = require('./pages/readme');

global.HELP_CMS = {
    filetypes: /html|htm|xml/,
    upload: 'file-upload',
    download: 'file-cms-template',
}

const app = express();

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

const createFolder = (folder) => {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

const uploadFolder = `./${global.HELP_CMS.upload}/`;

createFolder(uploadFolder);

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        let mark = req.connection.remoteAddress;
        mark = mark.replace(/:/g, '');
        mark = mark.replace(/ffff/g, '');
        // console.log(mark);
        const filename = `org-${mark}-${file.originalname}`;
        cb(null, filename);
    }
});

const checkFileType = (file) => {
    const orgType = path.extname(file.originalname).toLowerCase();
    console.log('checkFileType:', orgType);
    global.HELP_CMS.uploadOrgFileType = orgType;
    const mimetype = global.HELP_CMS.filetypes.test(file.mimetype);
    const extname = global.HELP_CMS.filetypes.test(orgType);
    return mimetype && extname;
}

const fileFilter = (req, file, cb) => {
    if (checkFileType(file)) {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
    cb("err: File upload only supports the following filetypes :" + global.HELP_CMS.filetypes);
}

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// upload
app.post('/upload', upload.single('html'), function (req, res, next) {
    const file = req.file;
    const replaceSrc = req.body['replace-src'];
    const donkeyData = req.body['donkey-data'];
    let fileOriginalName = file.originalname;

    // 验证上传的数据类型
    if (file === undefined) {
        let oops = '<span class="oops">Oops!</span> error';
        if (global.HELP_CMS.uploadOrgFileType === null) {
            oops += '<span class="text">并不支持上传空气!</span> 🤔';
        } else {
            let uploadOrgFileType = global.HELP_CMS.uploadOrgFileType;
            if (uploadOrgFileType.indexOf('.avi') !== -1) {
                oops += `👸 <span class="text">呐呐呐！你在上传什么啊？</span> 💋`;
            } else {
                oops += `<span class="text">${uploadOrgFileType ? '\'' + uploadOrgFileType + '\' ' : '未知'}类型不支持上传呦! </span> 🙅`;
            }
            global.HELP_CMS.uploadOrgFileType = null;
        }
        res.send(pagesIndex(oops));
        return;
    }

    // lib/index.js
    libIndex({
        'res': res,
        'file': file,
        'replaceSrc': replaceSrc,
        'donkeyData': donkeyData,
        'fileOriginalName': fileOriginalName,
    });
});

// download
app.get(`/${global.HELP_CMS.download}/:file`, function (req, res, next) {
    const file = req.params.file;
    // console.log(file);
    res.download(`./${global.HELP_CMS.download}/${file}`);
});

// readme
pagesReadme();

app.get('/', function (req, res, next) {
    res.send(pagesIndex());
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
    res.send(pagesIndex());
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
