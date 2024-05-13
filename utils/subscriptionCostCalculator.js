const calculate_subscription_cost = (frequencyLower, package) => {
    let subscription_cost = 0
    if (frequencyLower === "daily"){
        subscription_cost = package.daily_cost
    } else if(frequencyLower === "weekly") {
        subscription_cost = package.daily_cost * 7
    } else if(frequencyLower === "monthly") {
        subscription_cost = package.monthly_cost
    } else if (frequencyLower === "quarterly") {
        subscription_cost = package.monthly_cost * 3
    } else if(frequencyLower === "semi-annually"){
        subscription_cost = package.monthly_cost * 6
    } else if(frequencyLower === "yearly") {
        subscription_cost = package.monthly_cost * 12
    }

    return subscription_cost
}

module.exports = {
    calculate_subscription_cost
}