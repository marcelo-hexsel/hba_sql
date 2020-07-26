import HbaRuleModel from '../../src/domain/HbaRuleModel';

export default {
    validHbaRule: <HbaRuleModel>{
        type: 'host',
        address: '127.0.0.1',
        authMethod: 'md5',
        databases: ['postgres'],
        lineNumber: 35,
        netmask: '255.255.255.255',
        userNames: ['postgres', 'other_user'],
        options: [],
    },
};
