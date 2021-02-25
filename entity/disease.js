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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
