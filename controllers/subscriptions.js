const Subscription = require("../models/subscriptions");
const Package = require("../models/packages");
const { calculateEndDate } = require("../utils/endDateCalculator");
const { calculate_subscription_cost } = require("../utils/subscriptionCostCalculator")

const getSubscriptions = async(req, res) => {
    const subscriptions = await Subscription.find({}).populate("member").populate("package")
    res.send({ count: subscriptions.length, subscriptions: subscriptions })
}

const createSubscription = async(req, res) => {
    const { member, package, frequency, start_date } = req.body;

    try {
        const selected_package = await Package.findById({ "_id": package })

        if(!selected_package) return res.status(404).send({ error: `Package with id: ${package} not found!!` })
        
        let frequencyLower = frequency.toLowerCase()
        let end_date = calculateEndDate(frequencyLower, start_date);
        let subscription_cost = calculate_subscription_cost(frequencyLower, selected_package);

        const subscription = new Subscription({
            member: member,
            package: package,
            start_date: new Date(start_date),
            end_date: end_date,
            premium: subscription_cost,
            frequency: frequency,
            status: "Active"
        })
        await subscription.save()
        if(!subscription) return res.status(400).send({ error: "New subscription could not be created!!" })
        
        res.send({ subscription }).status(201)

    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
};

const getSubscriptionById = async(req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findById({ "_id": id }).populate("member").populate("package")
        if(!subscription) return res.status(404).send({ error: `Subscription with id: ${id} not found!!` })
        res.send(subscription).status(200);
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const updateSubscription = async(req, res) => {
    const { body, params: { id } } = req;
    try {
        const subscription = await Subscription.findByIdAndUpdate(id, { ...body }, { new: true })
        if(!subscription) return res.status(404).send({ error: `Subscription with id: ${id} not found!!` })
        res.send({ message: `Subscription with id: ${id} updated successfully`, subscription: subscription }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const deleteSubscription = async(req, res) => {
    const { id } = req.params;
    try {
        const subscription = await Subscription.findByIdAndDelete({ "_id": id })
        if(!subscription) return res.status(404).send({ error: `Subscription with id: ${id} not found!!` })
        res.send({ message: `Subscription with id: ${id} deleted successfully!!` }).status(204)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
}