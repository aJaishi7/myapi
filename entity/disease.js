const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true,
        unique: true
    },
    diseaseType: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    mildCauses: {
        type: String,
        required: false
    },
    severeCauses: {
        type: String,
        required: false,
    },
    symptoms: {
        type: String,
        required: false
    },
    preventiveMeasures: {
        type: String,
        required: true
    },
    medicines: {
        type: String,
        required: true
    },
    eatables: {
        type: String,
        required: true
    },
    diseaseImage: {
        type: String
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
