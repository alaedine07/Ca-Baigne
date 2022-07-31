exports.version = (req, res, next) =>
{
    return res.status(200).json("Hello world !!");
}

exports.alaedine = (req, res, next) =>
{
    return res.status(200).json("alaedine");
}