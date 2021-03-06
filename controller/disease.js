const Disease = require('../entity/disease');
const Error = require('../utilities/ErrorHandler');

//Add disease
exports.addDisease = async (req, res) => {
    const {
        diseaseName,
        diseaseType,
        description,
        mildCauses,
        severeCauses,
        preventiveMeasures,
        medicines,
        eatablles,
        user
    } = req.body;

    //Search for duplicate data in database
    await Disease.findOne({diseaseName: diseaseName}).then((data) => {
        if (data) {
            res.status(401).json({success: false, message: "Disease Already Saved"});
        }
        //Add disease to database
        const disease = Disease.create(req.body);
        if (!disease) {
            res.status(401).json({
                success: false,
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            data: disease
        })
    });
}

//Fetch disease from database
exports.findDisease = async (req, res) => {
    await Disease.find().then((disease) => {
        if (disease.length <= 0) {
            res.status(404).json({
                success: false,
                data: disease,
                count: disease.length
            })
        }
        res.status(201).json({
            success: true,
            data: disease,
            count: disease.length
        });
    })

}

//Search disease from database : filtering by name
exports.findDiseaseByName = async (req, res) => {

    const diseaseName = req.params.diseaseName;
    await Disease.find({diseaseName: diseaseName}).then((disease) => {
        if (disease === null) {
            res.status(404).json({
                success: false,
                data: disease
            });
        }
        res.status(201).json({
            success: true,
            data: disease
        });
    })

}

//Remove disease from database
exports.deleteDisease = async (req, res) => {

    const disease = await Disease.findById({_id: req.params.id});
    if (disease === null) {
        res.status(404).json({
            success: false,
            data: disease
        });
    }
    await disease.remove();
    res.status(200).json({
        success: true,
        count: disease.length,
        data: disease
    });
}

//Update disease data
exports.updateDisease = async (req, res) => {
    const disease = await Disease.findById({_id: req.params.id});
    if (!disease) {
        res.status(404).json({
            success: false,
            data: disease
        });
    }

    await Disease.findByIdAndUpdate(disease, req.body);
    res.status(200).json({
        success: true
    });
}



