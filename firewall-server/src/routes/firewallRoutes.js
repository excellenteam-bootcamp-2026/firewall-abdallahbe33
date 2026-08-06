const exprise = require('express');
const router = exprise.Router();
const { modeValidator, valuesValidator, idsValidator, activeValidator, ipsValidator, domainsValidator, portsValidator } = require('../middleware/validateRules');
const firewallController = require('../controllers/firewallController');
router.post(
    "/ips",
    valuesValidator,
    modeValidator,
    ipsValidator,
    firewallController.addIP
);

router.post(
    "/domains",
    valuesValidator,
    modeValidator,
    domainsValidator,
    firewallController.addDomain
);

router.post(
    "/ports",
    valuesValidator,
    modeValidator,
    portsValidator,
    firewallController.addPort
);

router.delete(
    "/rules",
    idsValidator,
    firewallController.deleteRule
);

router.get(
    "/rules",
    firewallController.getRules
);

router.patch(
    "/rules/status",
    idsValidator,
    activeValidator,
    firewallController.updateRuleStatus
);
module.exports = router;