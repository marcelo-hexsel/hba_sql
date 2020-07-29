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
    anotherValidHbaRule: <HbaRuleModel>{
        type: 'local',
        address: '192.168.0.1',
        authMethod: 'trust',
        databases: ['other_database'],
        lineNumber: 15,
        netmask: '255.255.255.254',
        userNames: ['test_user'],
        options: [],
    },
};
