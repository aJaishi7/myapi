const Disease = require('../entity/disease');
const Error = require('../utilities/ErrorHandler');

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

    await Disease.findOne({diseaseName: diseaseName}).then((data) => {
        if (data) {
            res.status(401).json({success: false, message: "Disease Already Saved"});
        }
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

exports.findDisease = async (req, res) => {
    const disease = await Disease.find();
    if (disease.length <= 0) {
        res.status(404).json({
            success: false,
            data: {},
            count: users.length
        })
    }
    res.status(201).json({
        success: true,
        data: disease,
        count: disease.length
    });
}

exports.findDiseaseByName = async (req, res) => {
    const {diseaseName} = req.body.diseaseName;
    const disease = await Disease.findOne({diseaseName: diseaseName});
    if (disease.length <= 0) {
        res.status(404).json({
            success: false,
            message: 'No Disease Found',
            data: {},
            count: users.length
        });
    }
    res.status(201).json({
        success: true,
        data: disease,
        count: disease.length
    });
}


