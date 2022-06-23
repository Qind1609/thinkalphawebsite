var {
    google
} = require("googleapis");
const drive = google.drive("v3");
const fs = require("fs");
const path = require("path");
const { Console } = require("console");
const { file } = require("googleapis/build/src/apis/file");
const User = require("../models/User");

const Ginfo = {
    type: "service_account",
    project_id: "1x69TKbG6-it4pupAyJA9ot53mEEU-UAK",
    private_key_id: "da818d482d5a9e39f5f015c5eddea1cc176b16b8",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCiabn6mN2xDoMe\ngriw4VdXJ7N4mrfRST0CHyvX1XmalYzLJWtm8CpbZ1PQQIPqx0gEVMKjs3pEuQLf\ncPcQpIPyvsushfe/qFqJhr3UhXTspc1GIe5sX1OdPaa7J9xKpUK9WBfCYazv8bZx\nAoZh4S5SodaxGeQeRctVCNWtCLKr1NbZriwMJyE9w6O10j9qI91+K2okm+yFthAj\n+jxRoM46rse2wb06renXZ6auds5B2K4GHl0Lxo2/0wtktqHH8GKHUjd6ocwJgV2h\nF7vL/zPUSB4JHp5aVb2vg8AorOx3yFfF+Fp53BCQ5+s2apU9CkpXnqXlwOVeOtof\n+4wxrTotAgMBAAECggEACJFIOMfQm12hyBMVmBXDDDtxabwg/z7Ro5IuYhEw/C5w\nbL+kFfGMYnb7F7ds3g6Le4MBzi3nwMamYqVsZb8v9gxfj9HKBce6mET4hZn8AYcm\nOCa5E5Qcbo/egu1G3ynZm/BmNyBSRZ68GjkLtWUcvZ+A76W8gBD8JBe2YeLdaK1Y\n4POiZbjNghisRXy+GaGG3cGOHbJIvXUfJkpJps2tX7JuF+4BOFKH4wKVWZclTSp1\n68QX3+7LDsftfXZPwwiV64OKRjcqHN74h1t25xMO1z1rrhQVV6wPI5726MY2RwCh\nTud4OX/VcGBq0EO04J0tiC+aUFhxZtLbrW2+i2CqYQKBgQDcUDxtUNnk2HFrDOTo\nAY+gtKKAWQscVvYQwFcTXz8U3zN5bGFO7SI9+qeGv/7VQGHz19yLC1h0i7cfyeyj\nxca2mEW/ZAXfycmMIL3n25145AYEyA7XJKtZMFR+8Vj/apGF4tOpgrRTXd3BrTjw\n3JBppwslTQ9Ng2JG6vGGRbBa3QKBgQC8uIa2TPp7O+CXKMi+DMYCz4BoNyEdaQZG\nTDfBjiHIKgThPS0kC2OLwk4JreLFlIr5J62Tc/V5JBdChZBgtwn4Pw/K1OH5QRTu\nHyl3iQMdN3MJ5sBqbpE3rwy1Z/gWxlTS4mgtbpFAT/dtFHQ9Hcpx0tz+/V5959Wv\n4UVQUd0fkQKBgE5yo5GpQG0kRP6BUODr7WCj8VkSW8pzjJraYicbuzKLZ6DM3rlj\n5tV68zwgEXWNv1M8geNg3tZhCYvgMsr+GYvbHLrRuuW8zG+BGR3+LUxmpV3+fopN\nHFZdxziMZ8xK/hZWdlfdmqg0vEnCjIv3fdShDm7xyYkoR05JSkcteWZhAoGAVTyC\nm5PpDf/dUGh7QltCk8JknK1Jp57n1phWFnW7jExuJ80Ztk3uiBEabgS7h8GvgxkI\nrLCTDkPevYzVyNjjB9xzpYjBB3L9oQ8yC2s2nNuOecpe3bNSo3PMqaJryt2JMjZQ\nFzT5JbL4bavvVCtAZGh4qDKHmxY6zVVRmRVgagECgYAtJhJbYs1+TtHCsvhHB+kc\npdaWyd+KDXIYHvWYzP09HB5emZIpZ9ZdHvOWC/GgxXRou9p+XuKw5Mg+sn2v+Ypp\n+7f77d13PKtFn+sOD/4Fr2P7tFXQIVMexx5As6K0a6qxbNl7OEqGZhm8jt01q7ej\nJlXdEjGwIeP9VcpZBQ0KKQ==\n-----END PRIVATE KEY-----\n",
    client_email: "googledriveapi@project-id-5836947869557226554.iam.gserviceaccount.com",
    client_id: "107980620500111642240",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/googledriveapi%40project-id-5836947869557226554.iam.gserviceaccount.com"
}

class fileController {

    //[GET] file
    listfile(req, res) {
        drive.files.list({
            auth: new google.auth.JWT(
                req.user.client_email,
                null,
                req.user.private_key, ["https://www.googleapis.com/auth/drive"],
                null
            ),
            pageSize: 10,
            q: "'" + Ginfo.project_id + "' in parents and trashed=false",
            fields: 'files(id, name,mimeType)',
        }, (error, {
            data
        }) => {
            if (error) res.json(error)
            const files = data.files;
            if (files.length) {
                res.json(files)
            } else {
                res.json('No files found.');
            }
        });
    }

    //[POST] file/ upfile
    upfile(req, res) {
        const file = req.file
        const filePath = path.join('./src/public/files/', file.originalname);
        var fileMetadata = {
            'name': file.originalname,
            parents: [Ginfo.project_id]
        };
        var media = {
            body: fs.createReadStream(filePath)
        };
        // console.log("check file ok!!")
        drive.files.create({
            auth: new google.auth.JWT(
                req.user.client_email,
                null,
                req.user.private_key, ["https://www.googleapis.com/auth/drive"],
                null
            ),
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (error, file) {
            if (error) {
                console.log(error);
            } else {
                console.log('direct !!!')
            }
        });
        fs.unlink('./src/public/files/' + file.originalname, function (error) {
            if (error) {
                res.send(error)
            }
            else {
                console.log("delect done")
            }
        })
    }

    //[DELETE] file/ upfile
    delete(req, res) {
        drive.files.delete({
            auth: new google.auth.JWT(
                req.user.client_email,
                null,
                req.user.private_key, ["https://www.googleapis.com/auth/drive"],
                null
            ),
            parents: Ginfo.project_id,
            fileId: req.params.id,
        });
        try {
            console.log(response.data, response.status);
        } catch (erroror) {
            console.log(erroror.message);
        }
        res.json({state: 'success'})
    }
}

module.exports = new fileController;
