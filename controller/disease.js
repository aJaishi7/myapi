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

