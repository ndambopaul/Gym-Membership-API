const Member = require("../models/members");

const getMembers = async(req, res) => {
    const members = await Member.find({});

    if(!members) return res.status(404).send({ error: "No members found" })

    res.send({ count: members.length, members: members })
}

const createMember = async(req, res) => {
    const data = req.body
    try {
        const newMember = await Member.create(data)
        if(!newMember) return res.status(400).send({ error: "New member could not be created!!" })

        res.send({ newMember }).status(201)

    } catch (error) {
        console.log({ error: error.message })
        return res.status(500).send({ error: error.message })
    }
};

const getMemberById = async(req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findById({ "_id": id })
        if(!member) return res.status(404).send({ error: `Member with id: ${id} not found!!` })

        res.send({ member }).status(200)
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message })
    }
}


const updateMember = async(req, res) => {
    const { body, params: { id } } = req

    try {
        const member = await Member.findByIdAndUpdate(id, { ...body }, { new: true })
        if(!member) return res.status(404).send({ error: `Member with id: ${id} not found!!` })
        
        res.send({ message: `Member with id: ${id} updated successfully!`, member: member }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        res.status(500).send({ error: error.message })
    }
}

const deleteMember = async(req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findByIdAndDelete({ "_id": id })
        if(!member) return res.status(404).send({ error: `Member with id: ${id} not found!!!` })

        res.send({ message: `Member with id: ${id} deleted successfully` }).status(204);
        
    } catch (error) {
        console.log({ error: error.message })
        return res.status(500).send({ error: error.message })
    }
}


const updateMemberStatus = async(req, res) => {
    const { body, params: { id } } = req

    try {
        const member = await Member.findByIdAndUpdate(id, body, { new: true })
        if(!member) return res.status(404).send({ error: `Member with id: ${id} not found!!` })
        return res.send({ message: `Status of member with id: ${id} updated to: ${member.status}`, member: member }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getMembers,
    createMember,
    updateMember,
    getMemberById,
    deleteMember,
    updateMemberStatus
}