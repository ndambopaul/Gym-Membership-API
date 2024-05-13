const Package = require("../models/packages");

const getPackages = async(req, res) => {
    const packages = await Package.find({})
    res.send({ count: packages.length, packages: packages })
}

const createPackage = async(req, res) => {
    const body = req.body;

    try {
        const package = await Package.create(body)
        if(!package) return res.status(400).send({ error: "New package could not be created!!" })
        res.send({ package }).status(201)

    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
};

const getPackageById = async(req, res) => {
    const { id } = req.params;

    try {
        const package = await Package.findById({ "_id": id })
        if(!package) return res.status(404).send({ error: `Package with id: ${id} not found!!` })
        res.send(package).status(200);
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const updatePackage = async(req, res) => {
    const { body, params: { id } } = req;
    try {
        const package = await Package.findByIdAndUpdate(id, { ...body }, { new: true })
        if(!package) return res.status(404).send({ error: `Package with id: ${id} not found!!` })
        res.send({ message: `Package with id: ${id} updated successfully`, package: package }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const deletePackage = async(req, res) => {
    const { id } = req.params;
    try {
        const package = await Package.findByIdAndDelete({ "_id": id })
        if(!package) return res.status(404).send({ error: `Package with id: ${id} not found!!` })
        res.send({ message: `Package with id: ${id} deleted successfully` }).status(204)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
}