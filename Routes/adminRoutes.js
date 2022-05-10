const router = require('express').Router();
const { get } = require('express/lib/response');
const getController = require('../Controller/getController')
const postController = require('../Controller/postController')
const patchController = require('../Controller/patchController');


(()=>{

    getRequest()

    postRequest()

    patchRequest()

    deleteRequest()

})();

function getRequest(){
    router.get('/', getController.getSlots)

}

function postRequest(){
    router.post('/login',postController.adminLogin)

}

function patchRequest(){
    router.patch('/booking',patchController.updateSlotStatus)
    router.patch('/checkout',patchController.checkout)


}

function deleteRequest(){

}

module.exports = router