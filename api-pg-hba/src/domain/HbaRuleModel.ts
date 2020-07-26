export default interface HbaRuleModel {

    id: number
    lineNumber: number | null
    type: string | null
    databases: string[]
    userNames: string[]
    address: string | null
    netmask: string | null
    authMethod: string | null
    options: string[]
    error: string | null

}