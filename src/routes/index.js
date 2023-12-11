const router=require("express").Router()
router.use("/auth", require("./auth.route"))
router.use("/users", require("./user.route"))
router.use('/blogs', require('./blog.route'));

module.exports=router
